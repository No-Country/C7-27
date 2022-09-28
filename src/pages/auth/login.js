import { useState } from 'react';

import NextLink from 'next/link';

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

import { useForm } from 'react-hook-form';
import { Layout } from '../../Layouts';

export default function loginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submit = (data) => {
    reset();
    console.log(data);
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
        onSubmit={handleSubmit(submit)}
      >
        <Stack spacing={2}>
          <FormLabel component="legend">Login</FormLabel>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
            <OutlinedInput
              id="component-outlined"
              {...register('email')}
              type="email"
              label="email"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              {...register('password')}
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
              label="i'm not a robot"
            />
          </FormGroup>
          <Button type="submit" variant="contained">
            Sign in
          </Button>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <NextLink passHref href={'/auth/register'}>
              <Link>Are you new in Hospital Name?</Link>
            </NextLink>
            <NextLink passHref href={'/auth/resetPassword'}>
              <Link>Forgot password?</Link>
            </NextLink>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}
