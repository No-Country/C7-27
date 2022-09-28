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
} from '../../components';
import { Layout } from '../../Layouts';

export default function registerPage() {
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
            <OutlinedInput id="component-outlined" type="email" label="email" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Password</InputLabel>
            <OutlinedInput
              id="component-outlined"
              // type={values.showPassword ? 'text' : 'password'}
              label="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
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
