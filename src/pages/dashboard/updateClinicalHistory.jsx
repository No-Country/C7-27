import { useForm } from 'react-hook-form';

import axios from 'axios';

import { useSnackbar } from 'notistack';

import {
    Button,
    Stack,
    FormLabel,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '../../components/auth';

import * as React from 'react';
import { DashboardLayout } from '../../Layouts/dashboard/DashboardLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function UpdateClinicHistory() {
    const {
        register,
        handleSubmit,
    } = useForm();

    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.users);
    const [patientList, setPatientList] = useState([]);
    const [observations, setObservations] = useState('');
    const [patientClinicalRef, setPatientClinicalRef] = useState(null);


    useEffect(() => {
        const getPatientList = async () => {
            const { data } = await axios.get(
                `/api/resources/getPatientList`
            );

            const newList = []
            data.map((patient) => {
                newList.push(patient.patientRef)
            })

            setPatientList(newList);
        };
        getPatientList()
    }, [])

    const submit = async () => {

        try {

            const updatedClinicHistory = {
                id: patientClinicalRef,
                date: new Date().toLocaleDateString(),
                professionalName: `${user.firstName} ${user.lastName}`,
                professionalRef: user.professionalRef,
                speciality: user.speciality,
                observations: observations
            }

            const url = `/api/clinicHistory/updateClinicHistory`;
            const response = await axios.put(url, updatedClinicHistory);

            if (response.status == 201) {
                enqueueSnackbar('Clinical history updated', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    },
                });
                setPatientClinicalRef(null)
            }

        } catch (e) {
            enqueueSnackbar('Error, Try again in a few minutes', {
                variant: 'error',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
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
                    <FormLabel component="legend">Clinic History</FormLabel>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-autowidth-label">
                            Patient Name
                        </InputLabel>
                        <Select
                            label="Patient Name"
                            {...register('patientName', {
                                required: {
                                    value: true,
                                    message: 'This field is required',
                                },
                            })}
                            defaultValue=""
                            onChange={(e) => {
                                setPatientClinicalRef(e.target.value)
                            }}
                            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                        >
                            {patientList.map((patient) => (
                                <MenuItem key={patient._id} value={patient.clinicHistoryRef} sx={{ textTransform: 'capitalize' }}>
                                    {`${patient.firstName} ${patient.lastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>




                    {patientClinicalRef !== null &&
                        <>
                            <FormControl sx={{ width: "100%" }}>
                                <TextField
                                    {...register("speciality", {
                                        required: { value: true, message: "This field is required" },
                                    })}
                                    InputProps={{
                                        disabled: true,
                                        style: { textTransform: "uppercase" }
                                    }}
                                    type="text"
                                    label="Speciality"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={user.speciality.toLowerCase()}
                                />
                            </FormControl>
                            <FormControl sx={{ width: "100%" }}>
                                <TextField
                                    {...register("date", {
                                        required: { value: true, message: "This field is required" },
                                    })}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                    type="text"
                                    label="Date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date().toLocaleDateString()}
                                />
                            </FormControl>
                            <FormControl sx={{ width: "100%" }}>
                                <TextField
                                    {...register("observations", {
                                        required: { value: true, message: "This field is required" },
                                    })}
                                    type="text"
                                    label="Observations"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setObservations(e.target.value)}
                                />
                            </FormControl>
                        </>
                    }




                    <Button type="submit" variant="contained" onClick={submit}>
                        Update
                    </Button>


                </Stack>
            </Box>
        </DashboardLayout >
    );
}

