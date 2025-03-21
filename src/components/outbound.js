import React, { useState ,useEffect,useCallback} from "react";
import {
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,TablePagination,
  CircularProgress,
  Backdrop
} from "@mui/material";



export default function Outbound(props)
{
  const [selectedValue, setSelectedValue] = useState('');
  const [showDetails, setShowDetails] = useState(false);
   const [options, setOptions] = useState([]);
   const [inBound, setInBound] = useState([]);

   const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
    const [open, setOpen] = useState(false);
    const uniqueId = props.unique;

   


  const fetchClientApi = useCallback(() => {

    fetch('http://localhost:8080/eisportal/api/v1/userClient',{
      method:"POST",
      body:JSON.stringify({
          "uniqueId": uniqueId
      }),
      headers:{
        'Content-type':'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(resp => {
  
        if(resp != null && resp.responseCode === '0')
        {
          console.log("Success - "+JSON.stringify(resp.clientDtls));
  
          setOptions(resp.clientDtls);
        }
        else if(resp != null && resp.responseCode === '1')
        {
          console.log("Failure - "+JSON.stringify(resp));
        }
        else
        {
          console.log("Error Occured - "+JSON.stringify(resp));
        }
        
    })
    .catch(err => console.log(err));
  },[uniqueId]);

  
  useEffect(() => {
    fetchClientApi();
  },[fetchClientApi]);


const fetchInbound = (lovValue) => {
  handleOpen();

  fetch('http://localhost:8080/eisportal/api/v1/outBoundMsg',{
    method:"POST",
    body:JSON.stringify({
        "clientTpid": lovValue
    }),
    headers:{
      'Content-type':'application/json; charset=UTF-8'
    }
  })
  .then(response => response.json())
  .then(resp => {
    handleClose();
    
      if(resp != null && resp.responseCode === '0')
      {
        console.log("Success - "+JSON.stringify(resp.inboundDtls));

        setInBound(resp.inboundDtls);
        setShowDetails(true);
      }
      else if(resp != null && resp.responseCode === '1')
      {
        console.log("Failure - "+JSON.stringify(resp));
        setShowDetails(false);
        setInBound([]);
      }
      else
      {
        console.log("Error Occured - "+JSON.stringify(resp));
        setShowDetails(false);
      }
      
  })
  .catch(err => console.log(err));
}

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const handleClose = () => {
  setOpen(false);
};
const handleOpen = () => {
  setOpen(true);
};


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 1, mt: 2}}>
          <Box>
          <Grid >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Client</InputLabel>
          <Select
          labelId="demo-select-small-label"
        id="demo-select-small"
        label="Client"
            value={selectedValue}
            
            onChange={(e) => {
              setSelectedValue(e.target.value);
              // setShowDetails(true);
            }}
            // displayEmpty
          >
            <MenuItem value="" onClick={() => {setShowDetails(false);setInBound([]);}}><em>Select an Option</em></MenuItem>
            {options.map((option) => (
              <MenuItem key={option.recordId} value={option.clientName} onClick={() => {fetchInbound(option.clientTpid)}}>{option.clientName}</MenuItem>
            ))}
          </Select>
          </FormControl>
          </Grid>
        
          </Box>

          <Box>

          {showDetails && (
      <Box sx={{ width: '100%' , overflow: 'hidden'}}>
        <TableContainer component={Paper} sx={{
            maxHeight: 30 * 18, // Approx 40px per row height for dense padding * 30 rows
          }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {inBound.length > 0 &&
                  Object.keys(inBound[0]).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inBound
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ id, ...rest }) => (
                  <TableRow key={id}>
                    {Object.entries(rest).map(([key, value]) => (
                      <TableCell key={key}>
                        <Typography variant="body2">{value}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 80]}
          component="div"
          count={inBound.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
        )}

          </Box>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </Box>
    );
}