import { dbConnect } from "../../config/dbConnect";
import Patient from "../../models/Patient";
import Professional from "../../models/Professional";
import User from "../../models/User";
import jwtGenerate from "../../utils/jwtGenerate";
import { serialize } from "cookie";
import verificationEmail from "../../utils/verificationEmail";

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

    if (user.verified == false) {
      verificationEmail(user._id, user.email);
      const error = new Error(
        "Cuenta no verificada, se ha enviado un nuevo correo para verificar la misma."
      );
      return res.status(400).json({ msg: error.message });
    }

    if (user.isProfessional) {
      let professionalUser;
      professionalUser = await Professional.findById(
        user.professionalRef.toString()
      )
        .populate({
          path: "appointmentsRef",
          select: "-_id -createdAt -updatedAt -professionalRef",
          populate: {
            path: "patientRef",
            select: "_id firstName lastName",
          },
        })
        .select("-createdAt -updatedAt");

      if (!professionalUser) {
        const error = new Error("Professional not found");
        return res.status(400).json({ msg: error.message });
      }

      const token = jwtGenerate(user._doc._id);

      const serialized = serialize("token", token, {
        httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
      // console.log(serialized);
      res.setHeader("Set-Cookie", serialized);

      return res.status(200).json({
        ...user._doc,
        token,
        ...professionalUser._doc,
      });
    } else {
      let patientUser;
      patientUser = await Patient.findById(user.patientRef.toString())
        .populate({
          path: "appointmentsRef",
          select: "-_id -createdAt -updatedAt -patientRef",
          populate: {
            path: "professionalRef",
            select: "_id firstName lastName",
          },
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

      const token = jwtGenerate(user._doc._id);

      const serialized = serialize("token", token, {
        httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
      // console.log(serialized);
      res.setHeader("Set-Cookie", serialized);

      return res.status(200).json({
        ...user._doc,
        token,
        ...patientUser._doc,
      });

    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}
