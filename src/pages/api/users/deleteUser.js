import { dbConnect } from "../../../config/dbConnect";
import Patient from "../../../models/Patient";
import Professional from "../../../models/Professional";
import User from "../../../models/User";
import ClinicHistory from "../../../models/ClinicHistory";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  if (method !== "DELETE")
    return res.status(400).json({ msg: "Wrong HTTP Method" });

  try {
    const { id } = body;
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      return res.status(400).json({ msg: error.message });
    }

    if (user.isProfessional) {
      const professional = await Professional.findById(
        user.professionalRef.toString()
      );

      if (professional.appointmentsRef.length > 0) {
        professional.AppointmentsRef.forEach(async (appointment) => {
          await Appointment.findByIdAndRemove(appointment._id);
        });
      }

      await Professional.findByIdAndRemove(professional._id);
      await User.findByIdAndDelete(id);
    } else {
      const patient = await Patient.findById(user.patientRef.toString());

      if (patient.appointmentsRef.length > 0) {
        patient.AppointmentsRef.forEach(async (appointment) => {
          await Appointment.findByIdAndRemove(appointment._id);
        });
      }

      await ClinicHistory.findByIdAndDelete(
        patient.clinicHistoryRef.toString()
      );
      await Patient.findByIdAndRemove(patient._id);
      await User.findByIdAndDelete(id);
    }
    return res.json({ msg: "User deleted" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
