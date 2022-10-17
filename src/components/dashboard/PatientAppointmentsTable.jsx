import React, { useState } from 'react';

import {
  Box,
  capitalize,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '../../components/auth';

import { SeverityPill } from './SeverityPill';
import axios from 'axios';

export function PatientAppointmentsTable({ appointments }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [id, setId] = useState('');

  const updateAppointment = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/updateAppointment`,
        {
          id,
          confirmed: false,
        }
      )
      .finally(() => {
        setId('');
        location.reload();
      });
  };

  const onClick = async (data) => {
    if (!data.confirmed) return;
    setId(data._id);
    setShowOverlay(true);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {showOverlay && (
        <Card
          sx={{
            position: 'absolute',
            backgroundColor: '#0009',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h3"
              textAlign={'center'}
              color={'white'}
            >
              Are your sure to delete this appointment?
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Button
              size="small"
              variant={'contained'}
              color="secondary"
              onClick={updateAppointment}
            >
              CONFIRM
            </Button>
            <Button
              size="small"
              variant={'contained'}
              color="error"
              onClick={() => setShowOverlay(false)}
            >
              CANCEL
            </Button>
          </CardActions>
        </Card>
      )}
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
          {appointments?.map((appointment) => (
            <TableRow hover key={appointment._id}>
              <TableCell>
                {`
              ${capitalize(appointment.professionalRef.lastName)}
              ${capitalize(appointment.professionalRef.firstName)}`}
              </TableCell>
              <TableCell>{appointment.professionalRef.speciality}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>
                <SeverityPill
                  color={appointment.confirmed ? 'success' : 'error'}
                  onClick={() => onClick(appointment)}
                  sx={{ cursor: 'pointer' }}
                >
                  {appointment.confirmed ? 'Confirmed' : 'Cancelled'}
                </SeverityPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
