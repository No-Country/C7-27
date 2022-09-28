import { Box, Grid, Typography } from '@mui/material';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

export const Layout = ({ children }) => {
  return (
    <Grid
      container
      sx={{ width: '100%', height: '100vh' }}
      justifyContent="space-between"
      spacing={0}
    >
      <Grid item xs={7} display="flex" padding={3}>
        <Box sx={{ position: 'absolute' }}>
          <Typography variant="h3" component="h2">
            <AccessibleForwardIcon sx={{ fontSize: 40 }} color="primary" />
            Hospital Name
          </Typography>
        </Box>
        <Grid
          justifyContent={'center'}
          alignItems={'center'}
          display="flex"
          flexGrow={1}
        >
          {children}
        </Grid>
      </Grid>
      <Grid item xs={5} overflow="hidden" height={'100vh'}>
        <img
          src="https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          alt="coss"
          width={'100%'}
        />
      </Grid>
    </Grid>
  );
};
