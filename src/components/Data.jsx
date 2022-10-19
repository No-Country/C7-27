import React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  ApartmentIcon,
} from "../components/auth";

export default function Data() {
  const dataArray = [
    {
      number: "+100",
      user: "doctors",
    },
    {
      number: "+500",
      user: "Patiets",
    },
    {
      number: "+50",
      user: "Specialities",
    },
  ];

  return (
    <Box>
      <Grid
        container
        spacing={5}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
        }}
      >
        {dataArray.map((data, index) => (
          <Grid
            item
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ width: { xs: "200px", sm: "100%" } }}
            >
              <ApartmentIcon sx={{ fontSize: 70 }} />
              <Stack>
                <Typography variant="h5">{data.number}</Typography>
                <Typography variant="h5">{data.user}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
