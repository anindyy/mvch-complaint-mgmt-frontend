import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      Not found. Back to <Link to="/">home</Link>
    </Box>
  );
}

export default NotFound;
