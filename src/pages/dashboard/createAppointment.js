import { useForm } from 'react-hook-form';

import axios from 'axios';

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
} from '../../components/auth';

import { DashboardLayout } from '../../Layouts/dashboard/DashboardLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function NewAppointment() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.users);

  const [professionals, setProfessionals] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const [specility, setSpecility] = useState('');

  useEffect(() => {
    getData(specility);
  }, [specility]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resources/getProfessionalSpecialitiesList`
      )
      .then(({ data }) => setSpecialities(data));
  });

  const getData = async (speciality = '') => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/professionals/allProfessionals`
    );
    data = data.filter(
      (professional) =>
        professional.professionalRef.specialities.toLowerCase() ===
        speciality.toLowerCase()
    );
    setProfessionals(data);
  };

  const submit = async ({ professionalRef }) => {
    try {
      const inputValues = {
        date: Date.now(),
        patientEmail: user.email,
        professionalRef,
        patientRef: user.patientRef,
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/newAppointment`;
      await axios.post(url, inputValues);
      reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <DashboardLayout>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          width: '100%',
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
            display: 'flex',
            width: '100%',
            maxWidth: '600px',
            justifyContent: 'center',
          }}
        >
          <FormLabel component="legend">New Appointment</FormLabel>

          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Speciality
            </InputLabel>
            <Select
              {...register('specialityInput', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
              error={errors.specialityInput ? true : false}
              onChange={(e) => setSpecility(e.target.value)}
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
            {errors.specialityInput && (
              <Typography variant="body2" component="p" color="error">
                {errors.specialityInput.message}
              </Typography>
            )}
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Professional Reference
            </InputLabel>
            <Select
              {...register('professionalRef', {
                required: {
                  value: true,
                  message: 'This field is required',
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
                >{`${professionalRef?.firstName} ${professionalRef?.lastName}`}</MenuItem>
              ))}
            </Select>
            {errors.professionalRef && (
              <Typography variant="body2" component="p" color="error">
                {errors.professionalRef.message}
              </Typography>
            )}
          </FormControl>

          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Box>
    </DashboardLayout>
  );
}
