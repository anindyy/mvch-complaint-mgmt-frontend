import React from "react";

import {
  Stack,
  Card,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Link,
  Divider
} from "@mui/material";

class TopBar extends React.Component {
  render() {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, bgcolor: "black" }}>
        <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Link variant="body1" href="/home" underline="none" sx={{ color: "white" }}>
            <b>MVCH Complaint Service</b>
          </Link>
          <Link variant="body2" href="/dashboard" underline="none" sx={{ color: "white" }}>
            View all complaints
          </Link>
          <Link component="button" variant="body2" underline="none" sx={{ color: "white" }}>
            View a complaint
          </Link>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="white">
            Hello, user!
          </Typography>
          <Button size="small" variant="text" sx={{
            bgcolor: "white", color: "black",
            '&:hover': {
              backgroundColor: 'grey',
              boxShadow: 'none',
            }
          }}>
            Log out
          </Button>
        </Stack>

      </Box>
    );
  }
}

export default TopBar;
