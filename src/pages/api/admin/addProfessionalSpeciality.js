import { dbConnect } from "../../../config/dbConnect";
import ProfessionalSpeciality from '../../../models/ProfessionalSpeciality'

dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "POST") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const newProfessionalSpeciality = new ProfessionalSpeciality({
            name: body.name
        });

        await newProfessionalSpeciality.save()

        return res.status(201).json(newProfessionalSpeciality);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
}