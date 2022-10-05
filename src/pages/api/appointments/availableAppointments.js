import { dbConnect } from "../../../config/dbConnect"
import Appointment from '../../../models/Appointment'
import Patient from '../../../models/Patient'
import Professional from '../../../models/Professional'

dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "GET") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {

        const { days } = await Professional.findById(body.professionalRef)

        const takenAppointments = await Appointment.find({ professionalRef: body.professionalRef })



        return res.status(201).json(date);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}