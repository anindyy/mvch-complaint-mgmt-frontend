import React, { useState } from "react";

import {
  Stack,
  Box,
  Card,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Grid,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";

function Form() {
  const [dateValue, setDateValue] = useState(moment().format());
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [selfAffected, setSelfAffected] = useState("");

  var onUpload = (event) => {
    let sizeInKB = event.target.files[0].size * 0.0009765625;
    let strSize = `${Number(sizeInKB.toFixed(0))} KB`;
    if (sizeInKB > 1000) {
      let sizeInMB = sizeInKB * 0.0009765625;
      strSize = `${Number(sizeInMB.toFixed(2))} MB`;
    }
    setFileName(event.target.files[0].name);
    setFileSize(strSize)
  };

  var handleDateChange = () => {

  }

  var handleSelfAffectedChange = (event) => {
    console.log(event.target.value)
    setSelfAffected(event.target.value);
  }

  return (
    <Box display="flex" justifyContent="center">
      <Card sx={{ p: 3, m: 6, minWidth: 'md', maxWidth: 'lg' }}>
        <Stack spacing={2} sx={{ display: "flex", alignItems: "flex-start" }}>
          {/* Title and description */}
          <Typography variant="h4">
            <b>Complaint Form</b>
          </Typography>
          <Typography variant="body1" sx={{ pb: 2, textAlign: "left" }}>
            Please send us details about the incident you would like to report.{" "}
            We will review and follow up with you as soon as possible.
          </Typography>

          {/* Email */}
          <TextField fullWidth label="Email" />
          <Typography variant="body2" textAlign="left">
            Looks like you have filled our form before. <br />
            <Link variant="body2" color="blue">Should we load your biodata?</Link>
          </Typography>

          {/* Biodata */}
          <Typography variant="h6">
            <b>Biodata</b>
          </Typography>
          <TextField fullWidth label="Full name" />
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <TextField fullWidth label="Street Address" />
            </Grid>
            <Grid item xs={1.5}>
              <TextField fullWidth label="Street No" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <TextField fullWidth label="Phone Number" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <TextField fullWidth label="Province/State/District" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Country" />
            </Grid>
          </Grid>

          {/* Complaint Details */}
          <Typography variant="h6">
            <b>Complaint Detail</b>
          </Typography>
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "b", "c"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Hospital" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={["a", "b", "c"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Facility" />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <DesktopDatePicker
            label="Incident Date"
            inputFormat="DD/MM/YYYY"
            value={dateValue}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField fullWidth multiline rows={4} label="Description" />

          <FormControl>
            <RadioGroup row
              value={selfAffected}
              onChange={handleSelfAffectedChange}>
              <FormControlLabel value="self" control={<Radio />} label="I experienced this myself" />
              <FormControlLabel value="other" control={<Radio />} label="Other people experienced this" />
            </RadioGroup>
            {selfAffected === "other" && <TextField fullWidth size="small" label="Affected people name" />}
          </FormControl>

          {/* Upload files */}
          <Typography variant="body1" >
            <b>File input</b>
            <Typography variant="body2">
              Documents, videos, photos, or other media to support your complaint. You can upload up to 16 MB.
            </Typography>
          </Typography>
          <Button variant="outlined" component="label">
            Upload File
            <input type="file" onChange={onUpload} hidden />
          </Button>
          {!!fileName && `${fileName} (${fileSize})`}

          {/* Submit button */}
          <Button variant="contained" sx={{ alignSelf: "flex-end", py: 1.5, px: 3}}>
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default Form;
