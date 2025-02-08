import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/login")}>
        Logout
      </Button>
    </Box>
  );
};

