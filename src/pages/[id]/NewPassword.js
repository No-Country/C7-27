import React, { useState } from "react";
import { Layout } from "../../Layouts";
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
  Link,
} from "../../components/auth";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/slices/user";

export default function newPassword({ id }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = (value) => {
    if (value === 1) setShowPassword(!showPassword);
    else setShowRepeatPassword(!showRepeatPassword);
  };

  const submit = async (values) => {
    const { password, repeatPassword } = values;
    if (password !== repeatPassword) {
      enqueueSnackbar("Passwords must be the same", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      try {
        await dispatch(changePassword({ id, password }));
        enqueueSnackbar("Password changed", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        router.push("/");
      } catch (e) {
        enqueueSnackbar(e.msg, {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
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
          <FormLabel component="legend">New Password</FormLabel>

          <FormControl>
            <TextField
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              label="Password"
              type={showPassword ? "text" : "Password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword(1)}
                      onMouseDown={() => handleClickShowPassword(1)}
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

          <FormControl>
            <TextField
              {...register("repeatPassword", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              type={showRepeatPassword ? "text" : "Password"}
              label="Repeat pasword"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword(2)}
                      onMouseDown={() => handleClickShowPassword(2)}
                      edge="end"
                    >
                      {!showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errors.repeatPassword ? true : false}
            />
            {errors.repeatPassword && (
              <Typography variant="body2" component="p" color="error">
                {errors.repeatPassword.message}
              </Typography>
            )}
          </FormControl>

          <Button type="submit" variant="contained">
            Change
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  return {
    props: {
      id,
    },
  };
}
