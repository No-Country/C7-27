import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Image from 'next/image';

export default function NavBar() {
  return (
    <Container >
        <Grid container sx={{ padding: 5 }}>
            <Grid item xs={6} sx={{ display:'flex', flexDirection:"column", justifyContent:'center', padding: 5 }}>
                <Typography variant="h3">
                    Online Appointments
                </Typography>
                <Typography variant="h6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="text" size="large">See detail</Button>
                    <Button variant='contained' size="large">Get started</Button>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{position: "relative", width: 500, height: 300}}>
                    <Image layout='fill' src="https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"/>
                </Box>
            </Grid>
        </Grid>
    </Container>
  );
}