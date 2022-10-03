import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ApartmentIcon from "@mui/icons-material/Apartment";
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
