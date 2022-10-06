import { format } from 'date-fns';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './SeverityPill';
import { useSelector } from 'react-redux';

export const LatestAppointments = (props) => {
  const { user } = useSelector((state) => state.users);

  return (
    <Card {...props}>
      <CardHeader title="Latest Appointments" />
      <Box sx={{ minWidth: 800 }}>
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
                  <TableCell>{appointment.professionalRef._id}</TableCell>
                  {/* <TableCell>{appointment.patientRef}</TableCell> */}
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={appointment.confirmed ? 'success' : 'error'}
                    >
                      {appointment.confirmed ? 'Confirmed' : 'Cancelled'}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
