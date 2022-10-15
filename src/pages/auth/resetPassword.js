import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  TextField,
  Stack,
  Typography,
  Box,
} from "../../components/auth";

import { Layout } from "../../Layouts";

export default function restPasswordPage() {
  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 6 },
          width: "100%",
          maxWidth: "800px",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant={"h5"} component={"h2"}>
          Enter Email
        </Typography>
        <Stack spacing={3}>
          <FormLabel component="legend">Reset Password</FormLabel>
          <FormControl>
            <TextField type="email" label="email adress" />
          </FormControl>

          <Typography variant="subtitle2" component="h5">
            By continuing, you agree that we create an account for you (unless
            already created), and accept our Terms and Conditions and Privacy
            Policy.
          </Typography>

          <Button variant="contained" sx={{ maxWidth: "200px" }}>
            Continue
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
