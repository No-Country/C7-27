import { dbConnect } from "../../../utils/dbConnect";
import User from "../../models/User";
import Patient from "../../models/Patient";
import ClinicHistory from "../../models/ClinicHistory";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    const error = new Error(`${method} method not supported`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const { email } = body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("Email in use");
      return res.status(400).json({ msg: error.message });
    }

    // creo el registro de usuario
    const newUser = new User({
      email: body.email,
      password: body.password,
      isProfessional: body.isProfessional,
    });

    // Creo el registro de historia clinia
    const newClinicHistory = new ClinicHistory();

    // Creo el registro de paciente
    const newPatient = new Patient({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
      phoneNumber: body.phoneNumber,
      medicalInsurance: body.medicalInsurance,
      bloodType: body.bloodType,
    });

    // Relaciono al paciente con la historia clinica
    newPatient.clinicHistoryRef = newClinicHistory._id;

    newUser.patientRef = newPatient._id;

    // Guardo los registros
    const savedUser = await newUser.save();
    await newPatient.save();
    await newClinicHistory.save();
    return res.status(201).json(savedUser);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
