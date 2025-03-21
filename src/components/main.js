import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate,useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Inbound from "./inbound";
import Outbound from "./outbound";

const drawerWidth = 250;


export default function Main() {
  const [open, setOpen] = useState(true);
  

  const navigate = useNavigate();
  const location = useLocation();

  const uniqueId = location.state?.message;
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true);
  const [content, setContent] = useState();

  


  const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
      });

      
    
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handleChange = (event) => {
        setAuth(event.target.checked);
      };


  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EIS EDI PORTAL
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                <MenuItem onClick={() => navigate("/login")}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      </ThemeProvider>

      {/* Side Drawer */}
      <Drawer
      anchor="left"
      open={open}
      variant="persistent"
        onClose={() => setOpen(false)}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            marginTop: "64px",
          }
        }}
      >
        <Box onClick={() => setOpen(false)}>
          <List>
            <ListItem button onClick={() => setContent(<Inbound unique={uniqueId}/>)}>
              <ListItemText primary="Inbound" />
            </ListItem>
            <ListItem button onClick={() => setContent(<Outbound unique={uniqueId}/>)}>
              <ListItemText primary="Outbound" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{flexGrow:1,  mt: 8}}>
        {content}
      </Box>
    </Box>
  );
};

