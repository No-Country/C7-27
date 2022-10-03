import { dbConnect } from "../../../config/dbConnect";
import MedicalInsurance from '../../../models/MedicalInsurance'

dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "POST") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const newMedicalInsurance = new MedicalInsurance({
            name: body.name,
            initials: body.initials,
        });

        await newMedicalInsurance.save()

        return res.status(201).json(newMedicalInsurance);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}