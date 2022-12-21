import React from "react";

import {
  Stack,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button 
} from "@mui/material";

class Form extends React.Component {
  render() {
    return (
      <Box p={6}>
        <Stack spacing={2} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Typography variant="h4">
            <b>Complaint Form</b>
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, textAlign: "left" }}>
            Please send us details about the incident you would like to report.{" "}
            <br />
            We will review and follow up with you as soon as possible.
          </Typography>

          <TextField fullWidth label="Email" />
          <Typography variant="body2">
            Looks like you have filled our form before.
            <Button variant="text">Should we load your biodata?</Button>
          </Typography>

          <Typography variant="h6">
            <b>Biodata</b>
          </Typography>
          <TextField fullWidth label="Full name" />
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="Street Address" />
            <TextField label="Street Number" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="Phone Number" />
            <TextField fullWidth label="City" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField fullWidth label="Province/State/District" />
            <TextField fullWidth label="Country" />
          </Stack>

          <Typography variant="h6">
            <b>Complaint Detail</b>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Autocomplete
              disablePortal
              fullWidth
              options={["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "b", "c"]}
              renderInput={(params) => (
                <TextField {...params} label="Hospital" />
              )}
            />
            <Autocomplete
              disablePortal
              fullWidth
              options={["a", "b", "c"]}
              renderInput={(params) => (
                <TextField {...params} label="Facility" />
              )}
            />
          </Stack>

          <TextField fullWidth label="TO DO: Date" />
          <TextField fullWidth multiline rows={4} label="Description" />

          <Button variant="outlined" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Stack>
      </Box>
    );
  }
}

export default Form;
