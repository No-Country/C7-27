import { dbConnect } from "../../../utils/dbConnect";
import User from "../../../models/User";
import Patient from "../../../models/Patient";
import Professional from "../../../models/Professional";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  const { newEmail, id } = body;
  if (method === "PUT") {
    try {
      const user = await User.findById(id);
      if (!user) {
        const error = new Error("Email not found");
        return res.status(400).json({ msg: error.message });
      }
      if (user.email === newEmail) {
        const error = new Error("The email is the same");
        return res.status(400).json({ msg: error.message });
      }
      const userEmail = user.email;
      if (user.isProfessional) {
        const professional = await Professional.findOne({ userEmail });
        professional.email = newEmail;
        await professional.save();
      } else {
        const patient = await Patient.findOne({ userEmail });
        patient.email = newEmail;
        await patient.save();
      }
      user.email = newEmail;
      const savedUser = await user.save();
      return res.json(savedUser);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}
