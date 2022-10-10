import React from "react";
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

export function ProfessionalAppointmentsTable({ appointments }) {
  return (
    <Table>
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
        {appointments.map((appointment) => (
          <TableRow hover key={appointment._id}>
            <TableCell>
              {appointment.patientRef.lastName}{" "}
              {appointment.patientRef.firstName}
            </TableCell>
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