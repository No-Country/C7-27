import { isBefore } from 'date-fns';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardHeader,
  ArrowRightIcon,
} from '../../components/auth';
import { useSelector } from 'react-redux';
import { ProfessionalAppointmentsTable } from './ProfessionalAppointmentsTable';
import { PatientAppointmentsTable } from './PatientAppointmentsTable';
import { useEffect, useState } from 'react';

export const LatestAppointments = (props) => {
  const { user } = useSelector((state) => state.users);
  const [ latestAppointments, setlatestAppointments ] = useState([])

  useEffect(() => {
      const today = new Date()
      const pastAppointments = user?.appointmentsRef?.filter((appointment) => {
        const appDate = new Date(appointment.date)
        return isBefore(appDate, today)
      })
      setlatestAppointments(pastAppointments)
  },[])

  return (
    <Card {...props}>
      <CardHeader title="Latest Appointments" />
      <Box sx={{ minWidth: 800 }}>
        {user &&
          (user.isProfessional ? (
            <ProfessionalAppointmentsTable
              appointments={latestAppointments}
            />
          ) : (
            <PatientAppointmentsTable appointments={latestAppointments} />
          ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Link passHref href={'/dashboard/appointments'}>
          <Button
            color="secondary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="contained"
          >
            View all
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
