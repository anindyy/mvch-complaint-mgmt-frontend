import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchAllComplaints } from "../api/complaints";
import { complaintColumns } from "../constants";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [query, setQuery] = useState("");

  const fetch = async () => {
    const { response } = await fetchAllComplaints();
    const data = response.map((x) => {
      x.id = x._id;
      return x;
    });
    setComplaints(data);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 2, marginBottom: 2 }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="95%"
      >
        <Typography
          variant="h6"
          component="h1"
          align="left"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Complaint List
        </Typography>
        <TextField
          value={query}
          onChange={handleChange}
          placeholder="Search complaint"
          sx={{ width: "35%", height: "1rem" }}
        />
      </Box>
      <Box height="80vh" width="95%">
        {complaints.length > 0 && (
          <DataGrid
            columns={complaintColumns}
            rows={complaints}
            rowHeight={48}
          />
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
