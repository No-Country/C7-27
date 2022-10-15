import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    if (method !== "GET") {
        const error = new Error(`${method} method not supported`);
        return res.status(400).json({ msg: error.message });
    }

    try {
        const patients = await User.find(
            { isProfessional: false },
            "patientRef"
        )
            .populate({
                path: "patientRef",
                select: "_id firstName lastName clinicHistoryRef",
            })
            .select("-_id");

        return res.json(patients);
    } catch (e) {
        console.log(e);
    }
}
