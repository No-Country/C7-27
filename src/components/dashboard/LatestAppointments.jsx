import { compareAsc, isAfter } from "date-fns";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardHeader,
  ArrowRightIcon,
} from "../../components/auth";
import { useSelector } from "react-redux";
import { ProfessionalAppointmentsTable } from "./ProfessionalAppointmentsTable";
import { PatientAppointmentsTable } from "./PatientAppointmentsTable";
import { useEffect, useState } from "react";

export const LatestAppointments = (props) => {
  const { user } = useSelector((state) => state.users);
  const [latestAppointments, setlatestAppointments] = useState([]);

  useEffect(() => {
    const getDayMonthYear = (appointment) => {
      return appointment.date.split("/");
    };

    const today = new Date();
    const nextAppointments = user?.appointmentsRef?.filter((appointment) => {
      const [day, month, year] = getDayMonthYear(appointment);
      const appointmentDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      return isAfter(appointmentDate, today);
    });
    nextAppointments.sort((appointmentA, appointmentB) => {
      const [dayA, monthA, yearA] = getDayMonthYear(appointmentA);
      const [dayB, monthB, yearB] = getDayMonthYear(appointmentB);
      const appointmentADate = new Date(yearA, monthA - 1, dayA);
      const appointmentBDate = new Date(yearB, monthB - 1, dayB);
      return compareAsc(appointmentADate, appointmentBDate);
    });
    setlatestAppointments(nextAppointments.slice(0, 5));
  }, [user]);

  return (
    <Card {...props}>
      <CardHeader title="Next five Appointments" />
      <Box sx={{ overflowX: 'auto'}}>
        {user &&
          (user.isProfessional ? (
            <ProfessionalAppointmentsTable appointments={latestAppointments} />
          ) : (
            <PatientAppointmentsTable appointments={latestAppointments} />
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Link passHref href={"/dashboard/appointments"}>
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
