import React from "react";

import { AppBar, Button, Toolbar, Link as MLink } from "./auth";

import Link from "next/link";
import { Logo } from "./ui/Logo";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo color="white" />
        <Button variant="contained" sx={{ fontSize: "20px" }}>
          <Link href="/auth/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
