import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Stack,
  Card,
  Box,
  Typography,
  Button,
  Chip,
  Grid,
  Input,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { fetchComplaintById, updateComplaintById } from "../api/complaints";

function View() {
  // Data states
  const { id } = useParams();
  const [status, setStatus] = useState("unresolved".toLowerCase());

  // Dialogue states
  const [dialogue, setDialogue] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [complaint, setComplaints] = useState(null);

  const fetch = async () => {
    try {
      const { data } = await fetchComplaintById(id);
      setComplaints(data.response);
      setStatus(data.response.status);
    } catch (err) {
      console.log(err.message);
    }
  };

  // When component mounts
  useEffect(() => {
    fetch();
  }, []);

  const getStatusColor = () => {
    if (status === "resolved") {
      return "success";
    } else if (status === "unresolved") {
      return "error";
    } else if (status === "checking") {
      return "warning";
    }
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSubmitStatus = async () => {
    try {
      await updateComplaintById({ id, status: newStatus });
      setStatus(newStatus);
      setDialogue(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!!complaint) {
    return (
      <>
        <Box flex p={6}>
          <Stack
            spacing={2}
            sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h4">
                <b>Complaint #{complaint._id}</b>
              </Typography>
              <Button
                size="small"
                variant="contained"
                onClick={() => setDialogue(true)}
              >
                Update report status
              </Button>
            </Box>

            {/* Complaint Detail */}
            <Stack
              spacing={1}
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <Typography variant="body2">
                {complaint.sender} / {complaint.createdAt}
              </Typography>
              <Grid container justify="space-between" alignItems="stretch">
                <Grid item xs sx={{ display: "flex", flexDirection: "column" }}>
                  <Card sx={{ p: 3, mr: 2, textAlign: "left", height: "100%" }}>
                    <Typography variant="body1">
                      {complaint.description}
                    </Typography>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs="auto"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Card sx={{ p: 3, textAlign: "left", height: "100%" }}>
                    <Typography variant="body1">
                      <b>Report status: </b>
                      <Chip
                        color={getStatusColor()}
                        label={status}
                        size="small"
                      ></Chip>
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      <b>Report date:</b>
                      <br />
                      {complaint.createdAt}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      <b>Incident type:</b>
                      <br />
                      {complaint.type}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      <b>Hospital name / facility:</b> <br />
                      {complaint.hospitalName} / {complaint.facility}
                    </Typography>
                    <br />
                    <Typography variant="body1">
                      <b>Affected party:</b> <br />
                      {complaint.nameAffected}{" "}
                      {complaint.selfAffected == "yes" && "(self-affected)"}
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
            {complaint.complainReplies &&
            complaint.complainReplies.length > 0 ? (
              <Grid container sx={{ display: "flex", width: "100%" }}>
                {complaint.complainReplies.map((reply) => (
                  <Grid
                    item
                    xs={12}
                    mb={4}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography variant="body2" alignSelf="flex-start">
                      {reply.senderName} / {reply.createdAt}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      <Card sx={{ p: 2, width: "100%", textAlign: "left" }}>
                        {reply.content}
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <>No replies yet</>
            )}

            {/* Writing a reply */}
            <Box
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Card sx={{ width: "100%", p: 2 }}>
                <Input
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

        {/* Dialog */}
        <Dialog open={dialogue}>
          <DialogContent>
            <DialogTitle>Update Complaint Status</DialogTitle>
            <FormControl fullWidth>
              <Select value={newStatus} onChange={handleStatusChange}>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="checking">Checking</MenuItem>
                <MenuItem value="unresolved">Unresolved</MenuItem>
              </Select>
            </FormControl>

            <DialogActions>
              <Button onClick={() => setDialogue(false)}>Cancel</Button>
              <Button onClick={handleSubmitStatus}>Save</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return <>Loading...</>;
  }
}

export default View;
