import React from "react";
import { Button, Typography, TextField, Container, Box } from "@mui/material";
import { login } from "../api/user";
import { useCookies } from "react-cookie";
import config from "../config";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies([config.cookieName]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const { token } = await login({ email, password });
    setCookie(config.cookieName, token);
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
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            SIGN IN
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
