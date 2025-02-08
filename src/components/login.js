import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from '../asset/backgrund3.jpg'



export default function LoginPage()
{

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();


  const handleSubmit = () => {
    let newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {

      navigate("/eismain");
    }
  };
   

    return (
        <>
      <Box sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundImage:  `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <Card sx={{ maxWidth: 400,
         padding: 3,
          borderRadius: 2,
          // color: "#fff",
          backgroundColor: 'transparent',
          border: "2px solid rgba(255,255,255,.2)",
          backdropFilter: "blur(30px)"
          }}>
        <CardContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
            EIS EDI PORTAL
          </Typography>
          <Typography variant="h6" textAlign="center" gutterBottom>
           Sign in to access EDI Portal 
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
            required
          />

<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <Link href="#" underline="hover" sx={{ fontSize: "14px" }}>
              Forgot Password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: "none" }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
      </Box>
        </>
    )
}