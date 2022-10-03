import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";
import Professional from "../../../models/Professional";
import Patient from "../../../models/Patient";
import jwt from "jsonwebtoken";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  const { token } = body;

  if (method === "POST") {
    try {
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      let user = await User.findById(id).select("-createdAt -updatedAt");
      if (!user) res.status(400).json({ msg: "User not found" });
      if (user.isProfessional) {
        let professionalUser;
        professionalUser = await Professional.findById(
          user.professionalRef.toString()
        )
          .populate("appointmentsRef")
          .select("-createdAt -updatedAt");
        if (!professionalUser) {
          const error = new Error("Professional not found");
          return res.status(400).json({ msg: error.message });
        }
        return res.status(200).json({
          ...user._doc,
          ...professionalUser._doc,
        });
      } else {
        let patientUser;
        patientUser = await Patient.findById(user.patientRef.toString())
          .populate({
            path: "appointmentsRef",
            select: "-_id -createdAt -updatedAt -patientRef",
          })
          .populate({
            path: "clinicHistoryRef",
            select: "-_id -createdAt -updatedAt",
          })
          .select("-createdAt -updatedAt");

        if (!patientUser) {
          const error = new Error("Patient not found");
          return res.status(400).json({ msg: error.message });
        }

        return res.status(200).json({
          ...user._doc,
          ...patientUser._doc,
        });
      }
    } catch (e) {
      return res.status(400).json(e.message);
    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}
