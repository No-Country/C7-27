import React from "react";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tab,
  Tabs,
  ApartmentIcon,
} from "../components/auth";

import Link from "next/link";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ApartmentIcon />
        <Typography variant="h6" component="div">
          Clinic Stuff
        </Typography>
        <Tabs sx={{ marginRight: "auto" }} textColor="inherit">
          <Tab label="section 1" />
          <Tab label="section 2" />
          <Tab label="section 3" />
          <Tab label="section 4" />
        </Tabs>
        <Button variant="contained">
          <Link href="/auth/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
