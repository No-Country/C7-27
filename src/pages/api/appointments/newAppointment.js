import { dbConnect } from "../../../config/dbConnect";
import Appointment from "../../../models/Appointment";
import Patient from "../../../models/Patient";
import Professional from "../../../models/Professional";
import sendEmail from "../../../utils/sendEmail";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    const error = new Error(`${method} method not supported`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const newAppointment = new Appointment({
      date: body.date,
      hour: body.hour,
      confirmed: true,
      patientRef: body.patientRef,
      professionalRef: body.professionalRef,
    });

    const patient = await Patient.findById(body.patientRef);
    const professional = await Professional.findById(body.professionalRef);

    console.log(patient);
    console.log(professional);

    //referencias de los turnos al paciente y profesional
    patient.appointmentsRef.push(newAppointment._id);
    professional.appointmentsRef.push(newAppointment._id);

    await newAppointment.save();
    await patient.save();
    await professional.save();

    //envio de email de notificacion
    const emailContent = `<p>You created a new appointment for the day ${body.date} at ${body.hour}hs.</p>
                              <p>Remember been 10 minutes before consultation time, Thanks.</p>`;
    const subject = "New appointmente confirmed";
    await sendEmail(body.patientEmail, subject, emailContent);

    return res.status(201).json(newAppointment);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
