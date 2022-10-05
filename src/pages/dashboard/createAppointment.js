import {useState} from 'react'
import {useForm} from 'react-hook-form'

import NextLink from 'next/link';
import Link from '@mui/material/Link';

import axios from 'axios'

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

import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";

export default function NewAppointment() {

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();



  const submit = async (values) => {
    try {
      console.log(values)
      // const url = `${NEXT_PUBLIC_API_URL}/api/appointments/newAppointment`
      // const { data } = await axios.post(url, values);
      // console.log(data);
      // reset();
    } catch (e) {
      console.log(e.message)
    }
  };


  return(
    <DashboardLayout>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          width: '100%',
          maxWidth: '500px',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <Stack spacing={2}>
          <FormLabel component="legend">New Appointment</FormLabel>

          <FormControl>
            <TextField
              {...register('patientEmail', {
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid format',
                },
              })}
              type="patientEmail"
              label="Email Address"
              error={errors.patientEmail ? true : false}
            />
            {errors.patientEmail && (
              <Typography variant="body2" component="p" color="error">
                {errors.patientEmail.message}
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
                  <MenuItem value="A">6331e64d1199842596e9d29c</MenuItem>
                  
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
    </DashboardLayout>)
}