import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "../../components/auth";
import { Layout } from "../../Layouts";
import { forgetPassword } from "../../store/slices/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function ResetPasswordPage() {
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

  const submit = async (values) => {
    try {
      await dispatch(forgetPassword(values));
      enqueueSnackbar("Email sended", {
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
      // console.log(e.msg);
    }
  };

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
        onSubmit={handleSubmit(submit)}
      >
        <Stack spacing={2}>
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

          <Button type="submit" variant="contained" sx={{ maxWidth: "200px" }}>
            Continue
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
