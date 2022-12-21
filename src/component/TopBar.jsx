import React from "react";
import { useCookies } from "react-cookie";
import { Stack, Box, Typography, Button, Link } from "@mui/material";
import config from "../config";
import { logout } from "../api/user";
import { useAuth } from "../hooks/useAuth";

function TopBar() {
  const { onLogout } = useAuth();

  const [cookie, _, removeCookie] = useCookies([
    config.nameCookieName,
    config.cookieName,
    config.roleCookieName,
  ]);
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
            <Link
              variant="body2"
              href="/dashboard"
              underline="none"
              sx={{ color: "white" }}
            >
              View all complaints
            </Link>
            <Link
              component="button"
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
  );
}

export default TopBar;
