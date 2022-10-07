<<<<<<< HEAD
import Head from "next/head";
=======
import Head from 'next/head';
>>>>>>> feat/dashboard
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
<<<<<<< HEAD
} from "../../components/auth";
import { DashboardLayout } from "../../Layouts/dashboard/DashboardLayout";
import { SeverityPill } from "../../components/dashboard";
import { useSelector } from "react-redux";
=======
} from '@mui/material';
import { DashboardLayout } from '../../Layouts/dashboard/DashboardLayout';
import { SeverityPill } from '../../components/dashboard';
import { useSelector } from 'react-redux';
>>>>>>> feat/dashboard

export default function AppointmentsPage({ token }) {
  const { user } = useSelector((state) => state.users);

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
<<<<<<< HEAD
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Professional</TableCell>
                        <TableCell>Speciality</TableCell>
                        <TableCell sortDirection="desc">
                          <Tooltip enterDelay={300} title="Sort">
                            <TableSortLabel active direction="desc">
                              Date
                            </TableSortLabel>
                          </Tooltip>
                        </TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user?.appointmentsRef?.map((appointment) => (
                        <TableRow hover key={appointment._id}>
                          <TableCell>{appointment.professionalRef}</TableCell>
                          <TableCell>{appointment.patientRef}</TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>
                            <SeverityPill
                              color={
                                appointment.confirmed ? "success" : "error"
                              }
                            >
                              {appointment.confirmed
                                ? "Confirmed"
                                : "Cancelled"}
                            </SeverityPill>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
=======
                  {!user?.isProfessional && (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Professional</TableCell>
                          <TableCell>Speciality</TableCell>
                          <TableCell sortDirection="desc">
                            <Tooltip enterDelay={300} title="Sort">
                              <TableSortLabel active direction="desc">
                                Date
                              </TableSortLabel>
                            </Tooltip>
                          </TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user?.appointmentsRef?.map((appointment) => (
                          <TableRow hover key={appointment._id}>
                            <TableCell>{appointment.professionalRef}</TableCell>
                            <TableCell>{appointment.patientRef}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>
                              <SeverityPill
                                color={
                                  appointment.confirmed ? 'success' : 'error'
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
>>>>>>> feat/dashboard
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
