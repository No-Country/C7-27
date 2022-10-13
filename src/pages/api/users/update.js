import { dbConnect } from "../../../config/dbConnect";
import Patient from "../../../models/Patient";
import User from "../../../models/User";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "PUT")
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  try {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      medicalInsurance,
      bloodType,
    } = body;

    const user = await User.findByIdAndUpdate(body.id, { email }).select(
      "-createdAt -updatedAt"
    );
    const patient = await Patient.findByIdAndUpdate(
      body.patientRef,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        medicalInsurance,
        bloodType,
      },
      { new: true }
    )
      .populate({
        path: "appointmentsRef",
        select: "-createdAt -updatedAt -patientRef",
        populate: {
          path: "professionalRef",
          select: "_id firstName lastName speciality",
        },
      })
      .populate({
        path: "clinicHistoryRef",
        select: "-_id -createdAt -updatedAt",
      })
      .select("-_id -createdAt -updatedAt");

    return res.status(200).json({ ...user._doc, ...patient._doc });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
