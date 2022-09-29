import { dbConnect } from "../../../config/dbConnect"
import { model } from 'mongoose'
import { Appointment } from '../../../models/Appointment'

dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "POST") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const collectionModel = model('Appointment', Appointment)
        await collectionModel.deleteOne({ _id: body.id })

        return res.status(201).json(`Appointment deleted`);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}