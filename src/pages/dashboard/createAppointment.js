import { useState } from 'react';
import { useForm } from 'react-hook-form';

import NextLink from 'next/link';
import Link from '@mui/material/Link';

import axios from 'axios';

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
  Typography,
  Select,
  MenuItem,
  TextField,
} from '../../components/auth';

import { DashboardLayout } from '../../Layouts/dashboard/DashboardLayout';
import { useSelector } from 'react-redux';

export default function NewAppointment() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.users);

  const submit = async ({ professionalRef }) => {
    try {
      const inputValues = {
        date: '30/09/2022 17:30hs',
        patientEmail: user.email,
        professionalRef,
        patientRef: user.patientRef,
      };

      console.log(inputValues);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/newAppointment`;
      const { data } = await axios.post(url, inputValues);
      console.log(data);
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
              <MenuItem value="6331e6781199842596e9d2a2">Jose Perez</MenuItem>
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
