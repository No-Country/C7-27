import React from "react";
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
} from "@mui/material";
import { SeverityPill } from "./SeverityPill";

export function PatientAppointmentsTable({ appointments }) {
  return (
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
              {appointment.professionalRef.lastName}{" "}
              {appointment.professionalRef.firstName}
            </TableCell>
            <TableCell>{appointment.professionalRef.specialities}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>
              <SeverityPill color={appointment.confirmed ? "success" : "error"}>
                {appointment.confirmed ? "Confirmed" : "Cancelled"}
              </SeverityPill>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
