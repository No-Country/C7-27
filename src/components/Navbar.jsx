import React from "react";

import { AppBar, Button, Toolbar, Link as MLink } from "./auth";

import Link from "next/link";
import { Logo } from "./ui/Logo";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Button variant="contained" sx={{ fontSize: "20px" }}>
          <Logo color="white" />
        </Button>
        <Link href="/auth/login">Login</Link>
      </Toolbar>
    </AppBar>
  );
}
