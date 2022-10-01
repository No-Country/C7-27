import { dbConnect } from "../../../config/dbConnect"
import { model } from 'mongoose'
import { Appointment } from '../../../models/Appointment'
import sendEmail from "../../../utils/sendEmail"


dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "PUT") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const collectionModel = model('Appointment', Appointment)

        const result = await collectionModel.findOneAndUpdate({ _id: body.id }, { state: body.state }, {
            new: true
        });

        //envio de email de notificacion
        const emailContent = `<p>El turno que usted solicitó con el profesional ${body.professionalName} para el día ${body.date} fué ${body.state}.</p>`
        await sendEmail(body.patientEmail, `Su turno fué ${body.state}`, emailContent)

        return res.status(201).json(result);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}