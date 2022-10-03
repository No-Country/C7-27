import { dbConnect } from "../../../config/dbConnect";
import MedicalInsurance from '../../../models/MedicalInsurance'

dbConnect();

export default async function handler(req, res) {
    const { method } = req;

    if (method !== "GET") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {

        const medicalInsurances = await MedicalInsurance.find().select('name initials')

        return res.status(201).json(medicalInsurances);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}