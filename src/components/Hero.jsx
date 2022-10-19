import React from "react";
import { Box, Grid, Button, Typography, Stack } from "../components/auth";

import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <Box>
      <Grid container sx={{ padding: 5 }}>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 5,
            gap: 2,
          }}
        >
          <Typography variant="h3">Online Appointments</Typography>
          <Typography variant="h6">
            Medi App is an online medical appointment service for connecting patients and healthcare professionals
          </Typography>
          <Typography variant="h6">
            You can choose your preferred health insurance and obtain a list of professionals that work with it.
            We have a vast number of different medical specialities to cover all your needs
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large">
              <Link href="auth/register">Create Account</Link>
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          md={0}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "500px",
              height: "374px",
              display: { xs: "none", lg: "block" },
            }}
          >
            <Image
              layout="fill"
              src="/static/images/hospital.jpg"
              alt="hospital"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
