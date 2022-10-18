import React from 'react';

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tab,
  Tabs,
  ApartmentIcon,
} from '../components/auth';

import Link from 'next/link';
import { Logo } from './ui/Logo';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Logo color="white" />
        <Tabs value={false} sx={{ marginRight: '20px' }} textColor="inherit">
          <Tab label={process.env.NEXT_PUBLIC_VERCEL_URL} />
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
