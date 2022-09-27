import { useState } from 'react';

import { Layout } from '../../Layouts';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  FormLabel,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

export default function loginPage() {
  const { email, password } = useForm();
  const [name, setName] = useState('');
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
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <FormLabel component="legend">Login</FormLabel>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
            <OutlinedInput
              id="component-outlined"
              value={name}
              onChange={handleChange}
              type="email"
              label="email"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              value={name}
              onChange={handleChange}
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
          <Button variant="contained">Sign in</Button>
          <Stack direction="row" spacing={2}>
            <Button>Are you new in Hospital Name?</Button>
            <Button>Forgot password?</Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}