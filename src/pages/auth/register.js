import NextLink from 'next/link';
import { useState } from 'react';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  FormLabel,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  VisibilityOff,
  Visibility,
} from '../../components/auth';
import Link from '@mui/material/Link';

import { Layout } from '../../Layouts';
import { Grid } from '@mui/material';

export default function registerPage() {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          width: '100%',
          maxWidth: '500px',
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <FormLabel component="legend">Register Patient</FormLabel>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
            <OutlinedInput id="component-outlined" type="email" label="email" />
          </FormControl>
          <Grid
            container
            width={'100%'}
            justifyContent={'space-between'}
            gap={2}
            display="flex"
          >
            <Grid item sx={{ flexGrow: 1 }}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  type="email"
                  label="email"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  type="email"
                  label="email"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="component-outlined">
                  Medical Insurance
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  type="email"
                  label="email"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel htmlFor="component-outlined">Blood Type</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  type="email"
                  label="email"
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControl>
            <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
            <OutlinedInput id="component-outlined" type="email" label="email" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              type={values.showPassword ? 'text' : 'password'}
              label="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="I accept the Terms or Conditions"
            />
          </FormGroup>
          <Button variant="contained">Sign in</Button>
          <Stack direction="row-reverse" spacing={2}>
            <NextLink href="/auth/login" passHref>
              <Link>I've account</Link>
            </NextLink>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}
