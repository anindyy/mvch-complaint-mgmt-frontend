import React from "react";
import { Navigate } from "react-router-dom";
import { Stack, Card, Box, Typography, TextField, Button } from "@mui/material";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewId: "",
      clicked: false,
    };
  }

  handleViewClick = () => {
    this.setState({
      ...this.state,
      clicked: true,
    });
  };

  onIdChange = (event) => {
    this.setState({
      ...this.state,
      viewId: event.target.value,
    });
  };

  render() {
    const { viewId, clicked } = this.state;
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Stack spacing={2} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ pb: 2 }}>
            MVCH Complaint Service
          </Typography>

          <Card>
            <Stack>
              <Button href="/form" variant="contained" sx={{ py: 3 }}>
                Submit New Complaint
              </Button>
            </Stack>
          </Card>

          <Typography variant="overline" display="block" textAlign="center">
            -- or --
          </Typography>

          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="body1">View a complaint</Typography>
              <TextField
                variant="outlined"
                size="small"
                label="Complaint Number"
                value={viewId}
                onChange={this.onIdChange}
              />
              <Button
                disabled={viewId.length === 0}
                variant="contained"
                onClick={this.handleViewClick}
              >
                View
              </Button>
              {clicked && <Navigate to={`/view/${viewId}`} replace={true} />}
            </Stack>
          </Card>
        </Stack>
      </Box>
    );
  }
}

export default Home;
