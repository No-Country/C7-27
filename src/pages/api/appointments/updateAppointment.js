import { dbConnect } from "../../../config/dbConnect"
import Appointment from '../../../models/Appointment'
import sendEmail from "../../../utils/sendEmail"


dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "PUT") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const result = await Appointment.findOneAndUpdate({ _id: body.id }, { confirmed: body.confirmed }, {
            new: true
        });

        //envio de email de notificacion
        const emailContent = `<p>El turno que usted solicitó para el día ${body.date} fué ${body.confirmed ? "Actualizado" : "Cancelado"}.</p>`
        await sendEmail(body.patientEmail, `Su turno fué ${body.confirmed ? "Actualizado" : "Cancelado"}`, emailContent)

        return res.status(201).json(result);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}