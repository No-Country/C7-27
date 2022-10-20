import React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  ApartmentIcon,
  EscalatorWarningIcon,
  MedicalServicesIcon,
} from "../components/auth";

export default function Data() {
  const dataArray = [
    {
      number: "+100",
      user: "Doctors",
      icon: "doctor",
    },
    {
      number: "+500",
      user: "Patients",
    },
    {
      number: "+50",
      user: "Specialities",
      icon: "speciality",
    },
  ];

  function Icon(icon) {
    if (icon == "doctor") {
      return <MedicalServicesIcon sx={{ fontSize: 70 }} />;
    }
    if (icon == "patient") {
      return <EscalatorWarningIcon sx={{ fontSize: 70 }} />;
    }
    if (icon == "speciality") {
      return <ApartmentIcon sx={{ fontSize: 70 }} />;
    }
  }

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
              px: 5,
            }}
          >
            <Stack
              direction="row"
              className="animate__animated animate__fadeIn"
              sx={{ width: "200px" }}
            >
              {Icon(data.icon)}

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
