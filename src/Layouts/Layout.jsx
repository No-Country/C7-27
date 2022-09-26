import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export const Layout = ({ children }) => {
  return (
    <Grid
      container
      sx={{ width: '100%', height: '100vh' }}
      justifyContent="space-between"
    >
      <Grid item xs={7}>
        <Typography variant="h3" component="h2">
          <Image
            src="https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            alt="hospital building"
            width={50}
            height={50}
          />
          Hospital Name
        </Typography>
        {children}
      </Grid>
      <Grid item xs={5} sx={{ width: '100%' }}>
        <img
          src="https://images.unsplash.com/photo-1607799013470-8a46c0db7eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          alt="hospital building"
          style={{ maxWidth: '100%', height: '100vh' }}
        />
      </Grid>
    </Grid>
  );
};
