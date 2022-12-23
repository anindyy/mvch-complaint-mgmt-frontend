import React from "react";
import { Button, Typography, TextField, Container, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { Stack } from "@mui/system";

function Login() {

  const { onLogin } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    await onLogin({ email, password })
  };

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
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            id="email"
            autoComplete="email"
            margin="normal"
            autoFocus
          />
          <TextField
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            margin="normal"
          />
          <Stack>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign in
            </Button>
            <Button href="/signup" variant="text" sx={{ mt: 3, mb: 2 }}>
              Create an account
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
