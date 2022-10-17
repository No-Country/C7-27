import { dbConnect } from "../../../config/dbConnect"
import ClinicHistory from '../../../models/ClinicHistory'


dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "POST") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {

        const foundClinicHistory = await ClinicHistory.findById(body.clinicHistoryRef)

        return res.status(201).json(foundClinicHistory);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}