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
  VisibilityOff,
  Visibility,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
} from '../../components/auth';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';
import { Layout } from '../../Layouts';
import axios from 'axios';

const medicalinsurances = ['Name 1', 'Name 2', 'Name 3', 'Name 4', 'Name 5'];

export default function registerPage() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (values) => {
    try {
      const url = 'http://localhost:3000/api/registerPatient';
      const { data } = await axios.post(url, values);
      console.log(data);
      reset();
    } catch (e) {
      console.log(e);
    }
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
          <FormLabel component="legend">Register Patient</FormLabel>

          <FormControl>
            <TextField
              {...register('email', {
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid format',
                },
              })}
              type="email"
              label="Email Address"
              error={errors.email ? true : false}
            />
            {errors.email && (
              <Typography variant="body2" component="p" color="error">
                {errors.email.message}
              </Typography>
            )}
          </FormControl>

          <FormControl>
            <TextField
              {...register('password', {
                required: { value: true, message: 'This field is required' },
                minLength: { value: 6, message: 'At least 6 characters' },
              })}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleClickShowPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.password ? true : false}
            />
            {errors.password && (
              <Typography variant="body2" component="p" color="error">
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
          <Grid
            container
            width={'100%'}
            justifyContent={'space-between'}
            gap={2}
            display="flex"
          >
            <Grid item sx={{ flexGrow: 5 }} xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  // id="component-outlined"
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                  type="text"
                  label="First Name"
                  error={errors.firstName ? true : false}
                />
                {errors.firstName && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }} xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  // id="component-outlined"
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                  type="text"
                  label="Last Name"
                  error={errors.lastName ? true : false}
                />
                {errors.lastName && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <FormControl sx={{ width: '100%' }} xs={12} sm={6}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Medical Insurance
                </InputLabel>
                <Select
                  label="Age"
                  {...register('medicalInsurance', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                  error={errors.medicalInsurance ? true : false}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {medicalinsurances.map((m) => (
                    <MenuItem value={m}>{m}</MenuItem>
                  ))}
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.medicalInsurance && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.medicalInsurance.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }} xs={12} sm={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Blood Type
                </InputLabel>
                <Select
                  label="Age"
                  {...register('bloodType', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                  error={errors.bloodType ? true : false}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </Select>
                {errors.bloodType && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.bloodType.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <FormControl xs={12}>
            <TextField
              // id="component-outlined"
              {...register('phoneNumber', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              type="text"
              label="Phone Number"
              error={errors.phoneNumber ? true : false}
            />
            {errors.phoneNumber && (
              <Typography variant="body2" component="p" color="error">
                {errors.phoneNumber.message}
              </Typography>
            )}
          </FormControl>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('check', {
                    required: { value: true, message: 'Accept' },
                  })}
                  defaultChecked={false}
                />
              }
              label="I accept the Terms or Conditions"
            />
            {errors.check && (
              <Typography variant="body2" component="p" color="error">
                {errors.check.message}
              </Typography>
            )}
          </FormGroup>

          <Button type="submit" variant="contained">
            Sign in
          </Button>
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
