import { useEffect, useMemo, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  Stack,
  FormLabel,
  Box,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  TextField,
  Grid,
  Snackbar,
} from "../../components/auth";
import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { updateProfile } from "../../store/slices/user";
import { useRouter } from "next/router";
import { SnackbarContent } from "@mui/material";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  medicalInsurance: "",
  bloodType: "",
};

export default function profile({ insurances }) {
  const {
    register,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return initialState;
    }, [initialState]),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);
  const [update, setUpdate] = useState(false);
  const [blood, setBlood] = useState("");
  const [insurance, setInsurance] = useState("");

  const [snack, setSnack] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    type: "",
  });

  const { horizontal, vertical } = snack;

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      medicalInsurance: user?.medicalInsurance || "",
      bloodType: user?.bloodType || "",
    });
    setBlood(user?.bloodType || "");
    setInsurance(user?.medicalInsurance || "");
  }, [user]);

  const submit = async (values) => {
    if (update) {
      if (validate(values)) {
        try {
          values = { ...values, id: user._id, patientRef: user.patientRef };
          await dispatch(updateProfile(values));
          setSnack({
            ...snack,
            open: true,
            type: "success",
            message: "User Updated",
          });
          setUpdate(false);
        } catch (e) {
          console.log(e.message);
        }
      } else {
        setSnack({
          ...snack,
          open: true,
          type: "error",
          message: "No values changed",
        });
      }
    } else setUpdate(true);
  };

  const validate = (values) => {
    const {
      firstName,
      lastaName,
      email,
      phoneNumber,
      medicalInsurance,
      bloodType,
    } = user;
    if (
      firstName !== values.firstName ||
      lastaName !== values.lastaName ||
      email !== values.email ||
      phoneNumber !== values.phoneNumber ||
      medicalInsurance !== values.medicalInsurance ||
      bloodType !== values.bloodType
    )
      return true;
    return false;
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
          <FormLabel component="legend">Profile</FormLabel>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              {...register("firstName", {
                required: { value: true, message: "This field is required" },
              })}
              InputProps={{
                disabled: !update,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              label="First Name"
              error={errors.firstName ? true : false}
            />
            {errors.firstName && (
              <Typography variant="body2" component="p" color="error">
                {errors.firstName.message}
              </Typography>
            )}
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              {...register("lastName", {
                required: { value: true, message: "This field is required" },
              })}
              InputProps={{
                disabled: !update,
              }}
              type="text"
              label="Last Name"
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.lastName ? true : false}
            />
            {errors.lastName && (
              <Typography variant="body2" component="p" color="error">
                {errors.lastName.message}
              </Typography>
            )}
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              {...register("email", {
                required: { value: true, message: "This field is required" },
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid format",
                },
              })}
              InputProps={{
                disabled: !update,
              }}
              type="text"
              label="Email"
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.email ? true : false}
            />
            {errors.email && (
              <Typography variant="body2" component="p" color="error">
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              {...register("phoneNumber", {
                required: { value: true, message: "This field is required" },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers",
                },
              })}
              InputProps={{
                disabled: !update,
              }}
              type="text"
              label="Phone Number"
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.phoneNumber ? true : false}
            />
            {errors.phoneNumber && (
              <Typography variant="body2" component="p" color="error">
                {errors.phoneNumber.message}
              </Typography>
            )}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="medical-select-label">
                    Medical Insurance
                  </InputLabel>
                  <Select
                    {...register("medicalInsurance", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    label="Medical Insurance"
                    disabled={!update}
                    value={insurance}
                    onChange={(e) => {
                      setInsurance(e.target.value);
                    }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                    error={errors.medicalInsurance ? true : false}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {insurances.map((insurance) => (
                      <MenuItem key={insurance._id} value={insurance.initials}>
                        {insurance.initials}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.medicalInsurance && (
                    <Typography variant="body2" component="p" color="error">
                      {errors.medicalInsurance.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="blood-select-label">Blood Type</InputLabel>
                  <Select
                    {...register("bloodType", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    label="Blood Type"
                    disabled={!update}
                    value={blood}
                    onChange={(e) => {
                      setBlood(e.target.value);
                    }}
                    error={errors.bloodType ? true : false}
                  >
                    <MenuItem value="">
                      <em> Select</em>
                    </MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                  {errors.bloodType && (
                    <Typography variant="body2" component="p" color="error">
                      {errors.bloodType.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>

          <Button type="submit" variant="contained">
            {!update ? "Edit" : "Update"}
          </Button>
        </Stack>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={vertical + horizontal}
        message={snack.message}
      >
        <SnackbarContent
          style={{
            backgroundColor: snack.type === "success" ? "green" : "red",
            fontWeight: 700,
          }}
          message={snack.message}
        />
      </Snackbar>
    </DashboardLayout>
  );
}

export async function getStaticProps(context) {
  const { data: insurances } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/resources/getMedicalInsuranceList`
  );

  insurances.sort(function (a, b) {
    if (a.initials < b.initials) {
      return -1;
    }
    if (a.initials > b.initials) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      insurances,
    },
  };
}
