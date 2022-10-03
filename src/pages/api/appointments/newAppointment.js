import { dbConnect } from "../../../config/dbConnect";
import Appointment from '../../../models/Appointment'
import sendEmail from "../../../utils/sendEmail"

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
            state: 'Confirmado',
            patientRef: body.patientRef,
            professionalRef: body.professionalRef,
        });

        await newAppointment.save()

        //envio de email de notificacion
        const emailContent = `<p>Usted solicitó un nuevo turno con el profesional ${body.professionalName} para el día ${body.date}.</p>
                              <p>Recuerde presentarse 10 minutos antes del horario de la consulta, muchas gracias.</p>`
        await sendEmail(body.patientEmail, "Nuevo turno confirmado", emailContent)

        return res.status(201).json(newAppointment);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}