import { useForm } from "react-hook-form";

import axios from "axios";

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
} from "../../components/auth";

import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendar from "./calendarTest";
import { useRouter } from "next/router";

export default function NewAppointment({ specialities }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { user } = useSelector((state) => state.users);
  const [professionals, setProfessionals] = useState([]);
  const [speciality, setSpeciality] = useState("");

  const [professional, setProfessional] = useState("");
  const [availability, setAvailability] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [date, setDate] = useState({ date: "", hour: "" });

  useEffect(() => {
    getData(speciality);
    setProfessional("");
    setAvailability([]);
    setAppointmentsList([]);
  }, [speciality]);

  useEffect(() => {
    if (professional) {
      async function fetchData() {
        try {
          const result = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/availableAppointments`,
            {
              professionalRef: professional,
            }
          );

          setAvailability(result.data[0]);
          setAppointmentsList(result.data[1]);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }
  }, [professional]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/resources/getProfessionalSpecialitiesList`
  //     )
  //     .then(({ data }) => setSpecialities(data));
  // }, []);

  const getData = async (speciality = "") => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/professionals/allProfessionals`
    );

    data = data.filter(
      (professional) =>
        professional.professionalRef.speciality.toLowerCase() ===
        speciality.toLowerCase()
    );
    setProfessionals(data);
  };

  const submit = async (values) => {
    // console.log(values);
    // console.log(date);
    values = {
      ...date,
      professionalRef: values.professionalRef,
      patientRef: user._id,
    };
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/newAppointment`;
      await axios.post(url, values);
      reset();
      router.push("/dashboard");
    } catch (e) {
      console.log(e.message);
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
          <FormLabel component="legend">New Appointment</FormLabel>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Speciality
            </InputLabel>
            <Select
              label="Speciality"
              {...register("speciality", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              error={errors.speciality ? true : false}
              onChange={(e) => setSpeciality(e.target.value)}
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

          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Professional Reference
            </InputLabel>
            <Select
              label="Professional Reference"
              {...register("professionalRef", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              error={errors.professionalRef ? true : false}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              {professionals?.map(({ professionalRef }) => (
                <MenuItem
                  key={professionalRef?._id}
                  value={`${professionalRef?._id}`}
                  onClick={() => setProfessional(professionalRef._id)}
                >{`${professionalRef?.firstName} ${professionalRef?.lastName}`}</MenuItem>
              ))}
            </Select>
            {errors.professionalRef && (
              <Typography variant="body2" component="p" color="error">
                {errors.professionalRef.message}
              </Typography>
            )}
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <Calendar
              availability={availability}
              appointmentsList={appointmentsList}
              date={date}
              setDate={setDate}
            />
          </FormControl>

          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Box>
    </DashboardLayout>
  );
}

export async function getStaticProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/resources/getProfessionalSpecialitiesList`
  );

  return {
    props: {
      specialities: data,
    },
  };
}
