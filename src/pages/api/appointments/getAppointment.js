import { dbConnect } from "../../../config/dbConnect";
import Appointment from "../../../models/Appointment";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "GET") {
    const error = new Error(`${method} method not supported`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const appointmentById = await Appointment.findOne({ _id: body.id }).select(
      "date state patientRef professionalRef"
    );
    return res.status(201).json(appointmentById);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
