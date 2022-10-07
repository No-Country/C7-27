// import { format } from 'date-fns';
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

export const LatestAppointments = (props) => {
  const { user } = useSelector((state) => state.users);

  return (
    <Card {...props}>
      <CardHeader title="Latest Appointments" />
      <Box sx={{ minWidth: 800 }}>
        {user &&
          (user.isProfessional ? (
            <ProfessionalAppointmentsTable
              appointments={user.appointmentsRef}
            />
          ) : (
            <PatientAppointmentsTable appointments={user.appointmentsRef} />
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
