import { useEffect, useState } from "react";

import {
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
  OutlinedInput,
  Chip,
  Modal,
} from "../../components/auth";

import { useForm } from "react-hook-form";
import { Layout } from "../../Layouts";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/slices/user";
import { useRouter } from "next/router";
import axios from "axios";

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

let avaliableDays = [
  { value: 1, name: "monday" },
  { value: 2, name: "tuesday" },
  { value: 3, name: "wednesday" },
  { value: 4, name: "thursday" },
  { value: 5, name: "friday" },
  { value: 6, name: "saturday" },
  { value: 0, name: "sunday" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "600px",
  maxHeight: "500px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  overflow: "auto",
  padding: "10px",
};

export default function RegisterProfessional({ insurances, specialities }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);

  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [medicalInsurancesList, setMedicalInsurancesList] = useState([]);
  const [days, setDays] = useState([{ day: "", availability: "" }]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayErrors, setDayErrors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if (!user.isAdmin) {
        router.push("/dashboard");
      } else {
        console.log("asd");
        setLoading(false);
      }
    }
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    let error = [];
    // verifico que los campos dias y horario no esten vacios
    for (let i = 0; i < days.length; i++) {
      if (Object.values(days[i]).includes("")) {
        error[i] = "both values are required";
      }
    }
    console.log(error);
    if (error.length > 0) setDayErrors(error);
    else {
      setDayErrors([]);
      setOpen(false);
    }
  };

  const addDay = () => {
    setDays([...days, { day: "", availability: "" }]);
  };

  const removeDay = (index) => {
    setDays(days.filter((day, i) => i !== index && day));
    let arr = selectedDays;
    arr.splice(index, 1);
    setSelectedDays(arr);
  };

  const handleChangeDay = (e, index) => {
    setDays(
      days.map((day, i) =>
        i === index ? { ...day, [e.target.name]: e.target.value } : day
      )
    );
    if (e.target.name === "day") {
      if (selectedDays[index]) {
        let arr = selectedDays;
        arr[index] = e.target.value;
        setSelectedDays(arr);
      } else {
        setSelectedDays([...selectedDays, e.target.value]);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (values) => {
    values = { ...values, days };
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
        {loading ? null : (
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

            <Grid container gap={2}>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Medical Insurances
                  </InputLabel>
                  <Select
                    multiple
                    {...register("medicalInsuranceList", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    error={errors.medicalInsuranceList ? true : false}
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
                    {insurances.map((insurance) => (
                      <MenuItem
                        key={insurance._id}
                        value={insurance.initials}
                        // style={getStyles(name, theme)}
                      >
                        {insurance.initials}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.medicalInsuranceList && (
                    <Typography variant="body2" component="p" color="error">
                      {errors.medicalInsuranceList.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item sx={{ flexGrow: 1 }}>
                <FormControl sx={{ width: "100%" }} xs={12}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Speciality
                  </InputLabel>
                  <Select
                    {...register("speciality", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    error={errors.speciality ? true : false}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {specialities.map((speciality) => (
                      <MenuItem key={speciality._id} value={speciality.name}>
                        {speciality.name}
                      </MenuItem>
                    ))}
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
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numbers",
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

            <Grid container alignItems="center" gap={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ width: "100px" }}
                  onClick={handleOpen}
                >
                  days
                </Button>
              </Grid>
              <Grid item>
                {Object.values(days[0]).includes("") && (
                  <Typography variant="body2" component="p" color="error">
                    One day is required
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Button type="submit" variant="contained">
              Sign in
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  sx={{ marginBottom: "20px" }}
                  variant="body1"
                  component="h2"
                >
                  Select Day and Availability
                </Typography>

                <Grid container gap={2}>
                  {days.map((day, index) => (
                    <Grid
                      container
                      sx={{ width: "100%" }}
                      gap={1}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={4}>
                        <TextField
                          sx={{ width: "100%" }}
                          variant="outlined"
                          label="day"
                          select
                          name="day"
                          value={day.day}
                          onChange={(e) => handleChangeDay(e, index, day.day)}
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>
                          {avaliableDays.map((aDay) =>
                            !selectedDays.includes(aDay.value) ? (
                              <MenuItem value={aDay.value}>
                                {aDay.name}
                              </MenuItem>
                            ) : (
                              <MenuItem
                                sx={{ display: "none" }}
                                value={aDay.value}
                              >
                                {aDay.name}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                          sx={{ width: "100%" }}
                          variant="outlined"
                          label="availability"
                          select
                          name="availability"
                          value={day.availability}
                          onChange={(e) => handleChangeDay(e, index)}
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>

                          <MenuItem value="morning">Morning</MenuItem>
                          <MenuItem value="evening">Evening</MenuItem>
                          <MenuItem value="fullday">Fullday</MenuItem>
                        </TextField>
                      </Grid>
                      {index !== 0 && (
                        <Grid item sm={2}>
                          <Button
                            sm={2}
                            variant="contained"
                            color="error"
                            sx={{ width: "30px", height: "30px" }}
                            onClick={() => removeDay(index)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      )}
                      {dayErrors[index] && (
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            component="p"
                            color="error"
                          >
                            {dayErrors[index]}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  ))}
                </Grid>

                <Button
                  sx={{ marginTop: "20px" }}
                  xs={12}
                  variant="contained"
                  onClick={() => addDay()}
                >
                  Add
                </Button>
                <Button
                  sx={{ marginTop: "20px", marginLeft: "10px" }}
                  xs={12}
                  variant="contained"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Modal>
          </Stack>
        )}
      </Box>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { data: insurances } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/resources/getMedicalInsuranceList`
  );

  const { data: specialities } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/resources/getProfessionalSpecialitiesList`
  );
  return {
    props: {
      insurances,
      specialities,
    },
  };
}
