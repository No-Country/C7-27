import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  Stack,
  FormLabel,
  Box,
  FormControl,
  Typography,
  TextField,
} from "../../components/auth";
import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { update as updateWebName } from "../../store/slices/ui";

const initialState = {
  webName: "",
};

export default function editWeb() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return initialState;
    }, [initialState]),
  });

  const [update, setUpdate] = useState(false);
  const { name } = useSelector((state) => state.ui)
  const dispatch = useDispatch();

  useEffect(() => {
    reset({
      webName: name,
    });
  }, []);

  const submit = async (values) => {
    if (update) {
        dispatch(updateWebName(values.webName))
        setUpdate(false);
    } else {
        setUpdate(true)
    }
  };

  return (
    <DashboardLayout>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "100%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
      >
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "600px",
            justifyContent: "center",
          }}
        >
          <FormLabel component="legend">Web</FormLabel>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              {...register("webName", {
                required: { value: true, message: "This field is required" },
              })}
              InputProps={{
                disabled: !update,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              label="Web Name"
              error={errors.webName ? true : false}
            />
            {errors.webName && (
              <Typography variant="body2" component="p" color="error">
                {errors.webName.message}
              </Typography>
            )}
          </FormControl>

          <Button type="submit" variant="contained">
            {!update ? "Edit" : "Update"}
          </Button>
        </Stack>
      </Box>
    </DashboardLayout>
  );
}