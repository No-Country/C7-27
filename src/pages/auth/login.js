import { useState } from "react";
import NextLink from "next/link";

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
  VisibilityOff,
  Visibility,
  Typography,
  TextField,
  Link,
} from "../../components/auth";

import { useForm } from "react-hook-form";
import { Layout } from "../../Layouts";
import { useDispatch } from "react-redux";
import { actionUserLogin } from "../../store/slices/user";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (values) => {
    try {
      const token = await dispatch(actionUserLogin(values));
      localStorage.setItem("token", token);
      reset();
      router.push("/dashboard");
    } catch (e) {
      enqueueSnackbar(e, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      console.log(e.message);
    }
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "100%",
          maxWidth: "500px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <Stack spacing={5} alignContent="center" justifyContent="center">
          <FormLabel component="legend">Login</FormLabel>

          <FormControl>
            <TextField
              {...register("email", {
                required: { value: true, message: "This field is required" },
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid format",
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
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              type={showPassword ? "text" : "Password"}
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

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("check", {
                    required: { value: true, message: "Accept" },
                  })}
                />
              }
              checked={check}
              onClick={() => setCheck(!check)}
              label="i'm not a robot"
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
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <NextLink passHref href={"/auth/register"}>
              <Link>Are you new in Hospital Name?</Link>
            </NextLink>
            <NextLink passHref href={"/auth/resetPassword"}>
              <Link>Forgot password?</Link>
            </NextLink>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
}
