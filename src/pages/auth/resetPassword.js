import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Box,
} from '../../components/auth';

import { Layout } from '../../Layouts';

export default function restPasswordPage() {
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 6 },
          width: '70%',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant={'h5'} component={'h2'}>
          Enter Email
        </Typography>
        <Stack spacing={3}>
          <FormLabel component="legend">Reset Password</FormLabel>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email Address</InputLabel>
            <OutlinedInput id="component-outlined" type="email" label="email" />
          </FormControl>

          <Typography variant="subtitle2" component="h5">
            By continuing, you agree that we create an account for you (unless
            already created), and accept our Terms and Conditions and Privacy
            Policy.
          </Typography>

          <Button variant="contained" sx={{ maxWidth: '200px' }}>
            Continue
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
