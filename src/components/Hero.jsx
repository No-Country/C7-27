import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Box, Button, Grid, Stack, Typography } from "../components/auth";

export default function NavBar() {
  return (
    <Grid
      container
      sx={{
        padding: 5,
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
          gap: 2,
        }}
      >
        <Typography variant="h3">Online Appointments</Typography>
        <Typography variant="h5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
          luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua Amet.
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
