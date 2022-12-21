import React from "react";

import {
  Stack,
  Card,
  Box,
  Typography,
  Button,
  Chip,
  Grid,
  Input
} from "@mui/material";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.complaintNumber = 123456;
    this.hospitalName = "MVCH";
    this.facility = "Emergency Department";
    this.affectedParty = "Jane Doe";
    this.selfAffected = true;
    this.status = "unresolved".toLowerCase();
    this.description = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. \
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
  }

  getStatusColor() {
    if (this.status === "resolved") {
      return "success";
    } else if (this.status === "unresolved") {
      return "error";
    } else if (this.status === "checking") {
      return "warning";
    }
  }

  render() {
    return (
      <Box flex p={6}>
        <Stack spacing={2} sx={{ display: "flex", alignItems: "flex-start", width: '100%' }}>
          <Typography variant="h4">
            <b>Complaint #{this.complaintNumber}</b>
          </Typography>

          {/* Complaint Detail */}
          <Stack spacing={1} sx={{ display: "flex", alignItems: "flex-start" }}>
            <Typography variant="body2">
              Jane Doe / 11 Apr 2022
            </Typography>
            <Grid container justify="space-between" alignItems="stretch">
              <Grid item xs sx={{ display: "flex", flexDirection: "column" }}>
                <Card sx={{ p: 3, mr: 2, textAlign: "left", height: "100%" }}>
                  <Typography variant="body1">
                    {this.description}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs="auto" sx={{ display: "flex", flexDirection: "column" }}>
                <Card sx={{ p: 3, textAlign: "left", height: "100%" }}>
                  <Typography variant="body1">
                    <b>Report status: </b>
                    <Chip color={this.getStatusColor()} label={this.status} size="small"></Chip>
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <b>Report date:</b>
                  </Typography>
                  <Typography variant="body1">
                    <b>Incident status:</b>
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <b>Hospital name / facility:</b> <br />
                    {this.hospitalName} / {this.facility}
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <b>Affected party:</b> <br />
                    {this.affectedParty} {this.selfAffected && "(self-affected)"}
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <b>Files:</b> <br />
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Stack>

          {/* Replies */}
          <Typography variant="h6">
            <b>Replies</b>
          </Typography>
          <Grid container sx={{ display: "flex", width: "100%" }}>
            <Grid item xs={12} mb={4} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" alignSelf="flex-start">
                Jane Doe / 11 Apr 2022
              </Typography>
              <Box sx={{ mt: 1, display: "flex", alignItems: "flex-start", width: "100%" }}>
                <Card sx={{ p: 2, width: "100%", textAlign: "left" }}>
                  Reply content
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} mb={4} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" alignSelf="flex-start">
                Jane Doe / 11 Apr 2022
              </Typography>
              <Box sx={{ mt: 1, display: "flex", alignItems: "flex-start", width: "100%" }}>
                <Card sx={{ p: 2, width: "100%", textAlign: "left" }}>
                  Reply content
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Writing a reply */}
          <Box sx={{ mt: 1, display: "flex", alignItems: "flex-start", width: "100%" }}>
            <Card sx={{ width: "100%", p: 2 }}>
              <Input
                hiddenLabel
                multiline
                fullWidth
                rows={2}
                placeholder="Write a reply"
              />
            </Card>
          </Box>
          <Button variant="contained" sx={{ p: 1, alignSelf: "flex-end" }}>
            Reply
          </Button>
        </Stack>
      </Box>
    );
  }
}

export default View;
