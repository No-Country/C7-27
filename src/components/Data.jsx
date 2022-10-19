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
      number: "+456",
      user: "Patients",
      description:
        "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.",
    },
    {
      number: "+456",
      user: "Professionals",
      description:
        "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.",
    },
    {
      number: "+50",
      user: "Specialities",
      description:
        "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.",
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
              px: 5,
            }}
          >
            <Stack
              direction="row"
              className="animate__animated animate__fadeIn"
              sx={{ width: "200px" }}
            >
              <ApartmentIcon sx={{ fontSize: 80 }} />
              <Stack>
                <Typography variant="h5">{data.number}</Typography>
                <Typography variant="h5">{data.user}</Typography>
              </Stack>
            </Stack>

            {/* <Typography
              className="animate__animated animate__fadeIn"
              variant="body"
            >
              {data.description}
            </Typography> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
