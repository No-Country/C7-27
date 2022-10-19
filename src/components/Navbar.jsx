import React from "react";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tab,
  Tabs,
  ApartmentIcon,
} from "./auth";

import Link from "next/link";
import { Logo } from "./ui/Logo";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo color="white" />
        <Button variant="contained" color="primary" size="large">
          <Link href="/auth/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
