import React, { useEffect, useState } from "react";

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
import { Link, Navigate } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import { fetchHospitals } from "../api/hospital";
import { sendComplaints } from "../api/complaints";

function Form() {
  const [submitId, setSubmitId] = useState(false);

  // Hospital response
  const [hospitalResponse, setHospitalResponse] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);

  // Data columns
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressNum, setAddressNum] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [hospital, setHospital] = useState("");
  const [facility, setFacility] = useState("");
  const [dateValue, setDateValue] = useState(moment().format());
  const [description, setDescripton] = useState("");
  const [selfAffected, setSelfAffected] = useState("");
  const [affectedPerson, setAffectedPerson] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  // Fetch hospital data
  useEffect(() => {
    fetch();
  }, [])

  const fetch = async () => {
    try {
      const data = await fetchHospitals();
      const hospitalListReponse = data.response;
      setHospitalResponse(data.response);
      setHospitalList(hospitalListReponse.map(({name}) => name));
    } catch (err) {
      console.log(err);
    }
  }

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

  var handleHospitalChange = (event, newValue) => {
    const newHospital = newValue;
    setHospital(newHospital);
    setFacility("");
      for (var i in hospitalResponse) {
      if (hospitalResponse[i]["name"] === newHospital) {
        setFacilityList(hospitalResponse[i]["facilities"]);
        break;
      }
    }
  }

  var handleSubmit = async () => {
    var nameAffected = selfAffected === "yes" ? fullName : affectedPerson;
    var currentTime = Date.now();
    var { data } = await sendComplaints({
      nameAffected: nameAffected,
      sender: fullName,
      hospitalName: hospital,
      facility: facility,
      createdAt: currentTime,
      description: description,
      files: 'file',
      status: 'unresolved',
      type: 'other'
    })
    setSubmitId(data.response._id);
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
          <TextField required fullWidth label="Email" onChange={(event) => { setEmail(event.target.value) }} />
          <Typography variant="body2" textAlign="left">
            Looks like you have filled our form before. <br />
            <Link variant="body2" color="blue">Should we load your biodata?</Link>
          </Typography>

          {/* Biodata */}
          <Typography variant="h6">
            <b>Biodata</b>
          </Typography>
          <TextField required fullWidth label="Full name" onChange={(event) => { setFullName(event.target.value) }} />
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <TextField fullWidth label="Street Address" onChange={(event) => { setAddress(event.target.value) }} />
            </Grid>
            <Grid item xs={1.5}>
              <TextField fullWidth label="Street No" onChange={(event) => { setAddressNum(event.target.value) }} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <TextField fullWidth label="Phone Number" onChange={(event) => { setPhone(event.target.value) }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" onChange={(event) => { setCity(event.target.value) }} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <TextField fullWidth label="Province/State/District" onChange={(event) => { setProvince(event.target.value) }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Country" onChange={(event) => { setCountry(event.target.value) }} />
            </Grid>
          </Grid>

          {/* Complaint Details */}
          <Typography variant="h6">
            <b>Complaint Detail</b>
          </Typography>
          <Grid container>
            <Grid item xs sx={{ mr: 2 }}>
              <FormControl fullWidth required>
                <Autocomplete
                  
                  value={hospital}
                  onChange={handleHospitalChange}
                  disablePortal
                  fullWidth
                  options={hospitalList}
                  renderInput={(params) => (
                    <TextField {...params} label="Hospital" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Autocomplete
                  value={facility}
                  onChange={(event, newValue) => { setFacility(newValue) }}
                  disablePortal
                  fullWidth
                  options={facilityList}
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
            onChange={(newDate) => {setDateValue(newDate)}}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField fullWidth multiline required rows={4} label="Description" onChange={(event) => {setDescripton(event.target.value)}} />

          <FormControl>
            <RadioGroup row
              value={selfAffected}
              onChange={(event) => {setSelfAffected(event.target.value)}}>
              <FormControlLabel value="yes" control={<Radio />} label="I experienced this myself" />
              <FormControlLabel value="no" control={<Radio />} label="Other people experienced this" />
            </RadioGroup>
            {selfAffected === "no" &&
              <TextField fullWidth size="small" label="Affected people name" onChange={(event) => {setAffectedPerson(event.target.value)}} />}
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
          <Button variant="contained" sx={{ alignSelf: "flex-end", py: 1.5, px: 3 }} onClick={handleSubmit}>
            Submit
          </Button>
          { submitId &&  <Navigate to={`/view/${submitId}`} replace={true} />}
        </Stack>
      </Card>
    </Box>
  );
}

export default Form;
