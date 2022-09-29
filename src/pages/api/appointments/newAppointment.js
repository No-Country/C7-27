import { dbConnect } from "../../../config/dbConnect";
import Appointment from '../../../models/Appointment'

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
        return res.status(201).json(newAppointment);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}