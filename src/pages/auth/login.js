import { useState } from "react";

import NextLink from "next/link";
import axios from "axios";

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
  Typography,
  TextField,
} from "../../components/auth";
import Link from "@mui/material/Link";

import { useForm } from "react-hook-form";
import { Layout } from "../../Layouts";

export default function loginPage() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [check, setCheck] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault(formatState);
  // };

  const submit = async (values) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/loginUser`
      const { data } = await axios.post(url, values)
      localStorage.setItem("token", data.token)
      console.log(data)
      reset()
    } catch (e) {
      console.log(e.message)
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
              type={showPassword ? "text" : "password"}
              label="password"
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
