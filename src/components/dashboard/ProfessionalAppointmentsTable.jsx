import React, { useState, useEffect } from "react";

import {
  Box,
  capitalize,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "../../components/auth";

import { SeverityPill } from "./SeverityPill";
import axios from "axios";

export function ProfessionalAppointmentsTable({ appointments }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [id, setId] = useState("");
  const [myAppointments, setMyAppointmes] = useState(appointments);

  useEffect(() => {
    if (appointments.length > 0) setMyAppointmes(appointments);
  }, [appointments]);

  const updateAppointment = () => {
    axios
      .put(`/api/appointments/updateAppointment`, {
        id,
        confirmed: false,
      })
      .finally(() => {
        setMyAppointmes(
          myAppointments.map((a) =>
            a._id === id ? { ...a, confirmed: false } : a
          )
        );
        setId("");
        setShowOverlay(false);
      });
  };

  const onClick = async (data) => {
    if (!data.confirmed) return;
    setId(data._id);
    setShowOverlay(true);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box>
        {showOverlay && (
          <Card
            sx={{
              position: "absolute",
              backgroundColor: "#0009",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="h3"
                textAlign={"center"}
                color={"white"}
              >
                Are your sure to delete this appointment?
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Button
                size="small"
                variant={"contained"}
                color="secondary"
                onClick={updateAppointment}
              >
                CONFIRM
              </Button>
              <Button
                size="small"
                variant={"contained"}
                color="error"
                onClick={() => setShowOverlay(false)}
              >
                CANCEL
              </Button>
            </CardActions>
          </Card>
        )}
      </Box>

      <Table sx={{ whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
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
          {myAppointments?.map((appointment) => (
            <TableRow
              className="animate__animated animate__fadeInLeft"
              hover
              key={appointment._id}
            >
              <TableCell>
                {`
              ${capitalize(appointment.patientRef.lastName)}
              ${capitalize(appointment.patientRef.firstName)}`}
              </TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>
                <SeverityPill
                  color={appointment.confirmed ? "success" : "error"}
                  onClick={() => onClick(appointment)}
                  sx={{ cursor: "pointer" }}
                >
                  {appointment.confirmed ? "Confirmed" : "Cancelled"}
                </SeverityPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
