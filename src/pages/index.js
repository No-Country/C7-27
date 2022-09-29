import { Box, Container, Link as MUILink, Stack } from '@mui/material';
import Link from 'next/link';
import NavBar from '../components/navbar';
import Hero from '../components/Hero'
import Data from '../components/Data'
import AppFooter from '../components/Footer';

export default function Home() {
  return (
    <>
        <NavBar/>
        <Hero/>
        <Data/>
        <AppFooter/>
    </>
  );
}
