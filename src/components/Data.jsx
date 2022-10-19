import React from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  ApartmentIcon,
} from '../components/auth';

export default function Data() {
  const dataArray = [
    {
      number: '+456',
      user: 'doctors',
      description:
        'Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.',
    },
    {
      number: '+456',
      user: 'doctors',
      description:
        'Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.',
    },
    {
      number: '+456',
      user: 'doctors',
      description:
        'Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam.',
    },
  ];

  return (
    <Box>
      <Grid container sx={{ padding: 5 }} spacing={10}>
        {dataArray.map((data, index) => (
          <Grid
            item
            xs
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 5,
            }}
          >
            <Stack
              direction="row"
              className="animate__animated animate__fadeIn"
            >
              <ApartmentIcon sx={{ fontSize: 80 }} />
              <Stack>
                <Typography variant="h4">{data.number}</Typography>
                <Typography variant="h6">{data.user}</Typography>
              </Stack>
            </Stack>
            <Typography
              className="animate__animated animate__fadeIn"
              variant="body"
            >
              {data.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
