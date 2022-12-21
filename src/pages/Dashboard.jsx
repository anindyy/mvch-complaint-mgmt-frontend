import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchAllComplaints } from "../api/complaints";
import { complaintColumns } from "../constants";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const display = useMemo(() => {
    return complaints.filter((x) =>
      x.description.toLowerCase().includes(query)
    );
  }, [query, complaints]);

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

  const handleClick = (params) => {
    const {
      row: { id },
    } = params;
    navigate(`/view/${id}`);
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
          variant="h5"
          component="h1"
          align="left"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          <b>Complaint List</b>
        </Typography>
        <TextField
          value={query}
          onChange={handleChange}
          placeholder="Search complaint by description"
          sx={{ width: "35%", height: "1rem" }}
        />
      </Box>
      <Box height="83vh" width="95%">
        {complaints.length > 0 && (
          <DataGrid
            columns={complaintColumns}
            onRowClick={handleClick}
            rows={query == "" ? complaints : display}
            rowHeight={48}
          />
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
