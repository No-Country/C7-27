import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Box, Button, Grid, Stack, Typography } from "../components/auth";

export default function NavBar() {
  return (
    <Grid
      container
      sx={{
        paddingX: 5,
        paddingY: 3,
        display: "flex",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography variant="h4">Online Appointments</Typography>
        <Typography variant="h5">
          MediApp is an online medical appointment service for connecting
          patients and healthcare professionales.
        </Typography>
        <Typography variant="h5">
          You can choose your preferred health insurance and obtain a list of
          professionals that work with it. We have a vast nmber of different
          medical specialities to cover all your needs
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="large">
            <Link href="auth/register">Create account</Link>
          </Button>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          position: "relative",
          minHeight: "400px",
          display: { xs: "none", md: "block" },
        }}
      >
        <Image
          src="/images/landing.webp"
          alt="Image"
          layout="fill"
          width="100%"
          height="100%"
          objectFit="contain"
        />
      </Grid>
    </Grid>
  );
}
