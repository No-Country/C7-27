import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ApartmentIcon from '@mui/icons-material/Apartment';

export default function Data() {

    const dataArray = [
        {
            number: "+456",
            user: "doctors",
            description: "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam."
        },
        {
            number: "+456",
            user: "doctors",
            description: "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam."
        },
        {
            number: "+456",
            user: "doctors",
            description: "Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam."
        }
    ]

  return (
    <Box>
        <Grid container sx={{ padding: 5 }} spacing={10}>
            {
                dataArray.map((data, index) => (
                    <Grid item xs key={index} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 5,
                    }}>
                        <Stack direction='row' >
                            <ApartmentIcon sx={{ fontSize: 80 }}/>
                            <Stack>
                                <Typography variant='h4'>
                                    {data.number}
                                </Typography>
                                <Typography variant='h6'>
                                    {data.user}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography variant='body'>
                            {data.description}
                        </Typography>
                    </Grid>
                ))
            }
        </Grid>
    </Box>
  );
}