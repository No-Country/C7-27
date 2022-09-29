import { dbConnect } from "../../config/dbConnect";
import Patient from "../../models/Patient";
import Professional from "../../models/Professional";
import User from "../../models/User";
import jwtGenerate from "../../utils/jwtGenerate";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === "POST") {
    const { email, password } = body;

    let user = await User.findOne({ email }).select("-createdAt -updatedAt");

    if (!user || !(await user.checkPassword(password))) {
      const error = new Error("Email or password are Incorrect");
      return res.status(400).json({ msg: error.message });
    }

    if (user.isProfessional) {
      let professionalUser;
      professionalUser = await Professional.findById(
        user.professionalRef.toString()
      )
        .populate("appointmentsRef")
        .select("-createdAt -updatedAt -professionalRef");

      if (!professionalUser) {
        const error = new Error("Professional not found");
        return res.status(400).json({ msg: error.message });
      }

      return res.status(200).json({
        ...user._doc,
        token: jwtGenerate(user._doc._id),
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

      const serialized = jwtGenerate(user._doc._id);
      res.setHeader("Set-Cookie", serialized);

      return res.status(200).json({
        ...user._doc,
        token: jwtGenerate(user._doc._id),
        ...patientUser._doc,
      });
    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}