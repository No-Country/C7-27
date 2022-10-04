import { dbConnect } from "../../../config/dbConnect"
//import { model } from 'mongoose'
import ClinicHistory from '../../../models/ClinicHistory'


dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "PUT") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const newClinicHistoryItem = { date: body.date, observations: body.observations, professionalRef: body.professionalRef }

        const foundClinicHistory = await ClinicHistory.findById(body.id)

        const findSpeciality = foundClinicHistory.history.find(({ speciality }) => speciality === body.speciality)

        //Si no encuentra la especialidad en su historial, la crea
        if (!findSpeciality) {
            foundClinicHistory.history.push({ speciality: body.speciality, details: [newClinicHistoryItem] })
        } else {
            findSpeciality.details.push(newClinicHistoryItem)
        }

        await foundClinicHistory.save()

        return res.status(201).json(foundClinicHistory);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}