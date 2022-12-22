import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Stack, Box, Typography, Button, Link, Dialog, DialogContent, TextField, DialogTitle, DialogContentText } from "@mui/material";
import config from "../config";
import { logout } from "../api/user";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

function TopBar() {
  const { onLogout } = useAuth();

  // Dialogue states
  const [dialogue, setDialogue] = useState(false);
  const [viewId, setViewId] = useState("");
  const [viewClicked, setViewClicked] = useState(false);

  const [cookie, _, removeCookie] = useCookies([
    config.nameCookieName,
    config.cookieName,
    config.roleCookieName,
  ]);

  useEffect(() => {
    setViewId("");
    setDialogue(false);
    setViewClicked(false);
  }, [viewClicked])

  const onIdChange = (event) => {
    setViewId(event.target.value);
  }

  const handleViewClick = () => {
    setViewClicked(true);
  }

  const handleLogout = async () => {
    try {
      await logout();
      removeCookie(config.nameCookieName);
      removeCookie(config.roleCookieName);
      onLogout();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          bgcolor: "primary.main",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Link
            variant="body1"
            href="/home"
            underline="none"
            sx={{ color: "white" }}
          >
            <b>MVCH Complaint Service</b>
          </Link>
          {cookie[config.cookieName] && (
            <>
              {cookie[config.roleCookieName] === "ADMIN" &&
                <Link
                  variant="body2"
                  href="/dashboard"
                  underline="none"
                  sx={{ color: "white" }}
                >
                  View all complaints
                </Link>
              }
              {cookie[config.roleCookieName] === "USER" &&
                <Link
                  variant="body2"
                  href="/form"
                  underline="none"
                  sx={{ color: "white" }}
                >
                  Submit new complaint
                </Link>
              }
              <Link
                component="button"
                onClick={() => setDialogue(true)}
                variant="body2"
                underline="none"
                sx={{ color: "white" }}
              >
                View a complaint
              </Link>
            </>
          )}
        </Stack>

        {cookie[config.cookieName] && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="body2" color="white">
              Hello, {cookie[config.nameCookieName]}!
            </Typography>
            <Button
              size="small"
              variant="text"
              sx={{ color: "white" }}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Stack>
        )}
      </Box>

      {/* View complaint dialogue */}
      <Dialog open={dialogue}>
        <DialogTitle>View a complaint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert a complaint number to view
          </DialogContentText>
          <br />
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              size="small"
              label="Complaint Number"
              value={viewId}
              onChange={onIdChange}
            />
            <Button
              disabled={viewId.length == 0}
              variant="contained"
              onClick={handleViewClick}
            >
              View
            </Button>
            <Button
              variant="outline"
              onClick={() => {setDialogue(false)}}
            >
              Cancel
            </Button>
            {viewClicked && <Navigate to={`/view/${viewId}`} replace={true} />}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TopBar;
