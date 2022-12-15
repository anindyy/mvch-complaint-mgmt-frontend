import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
} from "@mui/material";

function Signup() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          <b>Register</b>
        </Typography>
        <TextField fullWidth label="Email" sx={{ mt: 2 }} />
        <TextField fullWidth label="Full name" sx={{ mt: 2 }} />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          sx={{ mt: 2 }}
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField fullWidth label="Street Address" />
          <TextField label="Street Number" />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField fullWidth label="Phone Number" />
          <TextField fullWidth label="City" />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField fullWidth label="Province/State/District" />
          <TextField fullWidth label="Country" />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          REGISTER
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;
