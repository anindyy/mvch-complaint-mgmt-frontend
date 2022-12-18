import React from "react";

import { Stack, Card, Box, Container, Typography } from "@mui/material";

import { TextField, Button } from "@mui/material";

class Home extends React.Component {
  render() {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Stack spacing={2} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            MVCH Complaint Service
          </Typography>

          <Card>
            <Stack>
              <Button variant="contained" sx={{ py: 3 }}>
                Submit New Complaint
              </Button>
            </Stack>
          </Card>

          <Typography variant="overline" display="block">
            -- or --
          </Typography>

          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="body1">View a complaint</Typography>
              <TextField
                variant="outlined"
                size="small"
                label="Complaint Number"
              />
              <Button variant="contained">View</Button>
            </Stack>
          </Card>
        </Stack>
      </Box>
    );
  }
}

export default Home;
