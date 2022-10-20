import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Box, Button, Grid, Stack, Typography } from "../components/auth";

export default function NavBar() {
  return (
    <Grid
      container
      className="animate__animated animate__fadeInLeft"
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
          paddingLeft: {
            lg: 15,
          },
          gap: 2,
        }}
      >
        <Typography variant="h3">Online Appointments</Typography>
        <Typography variant="h6">
          MediApp is an online medical appointment service for connecting
          patients and healthcare professionales.
        </Typography>
        <Typography variant="h6">
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
          height: "400px",
          display: { xs: "none", md: "block" },
          paddingRight: 15,
        }}
      >
        <Image
          src="/images/hospital.jpg"
          alt="Image"
          layout="fill"
          objectFit="contain"
        />
      </Grid>
    </Grid>
  );
}
