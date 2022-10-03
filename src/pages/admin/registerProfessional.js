import { useState } from "react";
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
} from "../../components/auth";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";

import { useForm } from "react-hook-form";
import { Layout } from "../../Layouts";
import { useDispatch } from "react-redux";
import { userRegister } from "../../store/slices/user";
import { useRouter } from "next/router";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const medicalinsurances = ["Name 1", "Name 2", "Name 3", "Name 4", "Name 5"];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function registerProfessional() {
  const {
    register,
    handleSubmit,
    reset,
    values,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [medicalInsurancesList, setMedicalInsurancesList] = useState([]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (values) => {
    console.log(values);
    try {
      dispatch(userRegister(values));
      reset();
      router.push("/dashboard");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMedicalInsurancesList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
        <Stack spacing={2}>
          <FormLabel component="legend">Register Professional</FormLabel>

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
          <Grid
            container
            width={"100%"}
            justifyContent={"space-between"}
            gap={2}
            display="flex"
          >
            <Grid item sx={{ flexGrow: 5 }} xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  // id="component-outlined"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  type="text"
                  label="First Name"
                  error={errors.firstName ? true : false}
                />
                {errors.firstName && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.firstName.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }} xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  // id="component-outlined"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  type="text"
                  label="Last Name"
                  error={errors.lastName ? true : false}
                />
                {errors.lastName && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.lastName.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Medical Insurances
                </InputLabel>
                <Select
                  labelId="Medical Insurances"
                  id="demo-multiple-chip"
                  multiple
                  {...register("medicalInsuranceList", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  value={medicalInsurancesList}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {medicalinsurances.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      // style={getStyles(name, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Speciality
                </InputLabel>
                <Select
                  label="Age"
                  {...register("specialities", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  error={errors.speciality ? true : false}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="Nurse">Nurse</MenuItem>
                  <MenuItem value="Dentist">Dentist</MenuItem>
                  <MenuItem value="Radiologist">Radiologist</MenuItem>
                  <MenuItem value="Psychologist">Psychologist</MenuItem>
                </Select>
                {errors.speciality && (
                  <Typography variant="body2" component="p" color="error">
                    {errors.speciality.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <FormControl xs={12}>
            <TextField
              // id="component-outlined"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              type="text"
              label="Phone Number"
              error={errors.phoneNumber ? true : false}
            />
            {errors.phoneNumber && (
              <Typography variant="body2" component="p" color="error">
                {errors.phoneNumber.message}
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
                  defaultChecked={false}
                />
              }
              label="Is Admin"
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
        </Stack>
      </Box>
    </Layout>
  );
}
