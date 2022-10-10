import { dbConnect } from "../../../config/dbConnect";
import ProfessionalSpeciality from "../../../models/ProfessionalSpeciality";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method !== "GET") {
    const error = new Error(`${method} method not supported`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const specialities = await ProfessionalSpeciality.find().select("name");
    return res.status(201).json(specialities);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
