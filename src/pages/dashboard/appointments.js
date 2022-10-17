import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  TableBody,
  Card,
  CardHeader,
} from '../../components/auth';
import { DashboardLayout } from '../../Layouts/dashboard/DashboardLayout';
import { SeverityPill } from '../../components/dashboard';
import { useSelector } from 'react-redux';
import { capitalize } from '@mui/material';
import { useState } from 'react';

export default function AppointmentsPage({ token }) {
  const { user } = useSelector((state) => state.users);

  const [isSorted, setIsSorted] = useState(true);


  console.log(user?.appointmentsRef)


  const hourFormat = (hour) => {
    const turn = hour.split(':')[0];
    if (turn < 12) return 'am';
    else return 'pm';
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Appointments</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Card>
                <CardHeader title="Your Appointments" />
                <Box sx={{ minWidth: 800 }}>
                  {!user?.isProfessional && (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Professional</TableCell>
                          <TableCell>Speciality</TableCell>
                          <TableCell>
                            <Tooltip enterDelay={300} title="Sort">
                              <TableSortLabel
                                active
                                direction={isSorted ? 'asc' : 'desc'}
                                onClick={() => setIsSorted(!isSorted)}
                              >
                                Date
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                          <TableCell>schedule</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isSorted
                          ? user?.appointmentsRef
                            ?.map((appointment) => (
                              <TableRow hover key={appointment._id}>
                                <TableCell>
                                  {`${capitalize(
                                    appointment.professionalRef.lastName
                                  )} ${capitalize(
                                    appointment.professionalRef.firstName
                                  )}`}
                                </TableCell>
                                <TableCell>
                                  {appointment.professionalRef.speciality}
                                </TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>
                                  {appointment.hour}{' '}
                                  {hourFormat(appointment.hour)}
                                </TableCell>
                                <TableCell>
                                  <SeverityPill
                                    color={
                                      appointment.confirmed
                                        ? 'success'
                                        : 'error'
                                    }
                                  >
                                    {appointment.confirmed
                                      ? 'Confirmed'
                                      : 'Cancelled'}
                                  </SeverityPill>
                                </TableCell>
                              </TableRow>
                            ))
                            .reverse()
                          : user?.appointmentsRef?.map((appointment) => (
                            <TableRow hover key={appointment._id}>
                              <TableCell>
                                {`${capitalize(
                                  appointment.professionalRef.lastName
                                )} ${capitalize(
                                  appointment.professionalRef.firstName
                                )}`}
                              </TableCell>
                              <TableCell>
                                {appointment.professionalRef.speciality}
                              </TableCell>
                              <TableCell>{appointment.date}</TableCell>
                              <TableCell>
                                {appointment.hour}{' '}
                                {hourFormat(appointment.hour)}
                              </TableCell>
                              <TableCell>
                                <SeverityPill
                                  color={
                                    appointment.confirmed
                                      ? 'success'
                                      : 'error'
                                  }
                                >
                                  {appointment.confirmed
                                    ? 'Confirmed'
                                    : 'Cancelled'}
                                </SeverityPill>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
