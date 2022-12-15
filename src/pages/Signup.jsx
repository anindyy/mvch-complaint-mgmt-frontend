import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const baseUrl = "http://localhost:8000";

function Signup() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body = {};
    for (const pair of data.entries()) {
      const [key, value] = pair;
      body[key] = value;
    }
    try {
      const res = await axios.post(`${baseUrl}/user/register`, body);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
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
        <Typography variant="h6">
          <b>Register</b>
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email"
            id="email"
            name="email"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Full name"
            id="fullName"
            name="fullName"
            sx={{ mt: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            fullWidth
            sx={{ mt: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField fullWidth label="Street Address" id="road" name="road" />
            <TextField label="Street Number" id="number" name="number" />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Phone Number"
              id="phoneNum"
              name="phoneNum"
            />
            <TextField fullWidth label="City" id="city" name="city" />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Province/State/District"
              id="province"
              name="province"
            />
            <TextField fullWidth label="Country" id="country" name="country" />
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
      </Box>
    </Container>
  );
}

export default Signup;
