import { dbConnect } from "../../config/dbConnect";
import User from "../../models/User";
import Patient from "../../models/Patient";
import ClinicHistory from "../../models/ClinicHistory";
import Token from "../../models/Token";
import sendEmail from "../../utils/sendEmail"
import { v4 as uuidv4 } from 'uuid';

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
      isProfessional: false,
      verified: false
    });

    //creacion del token temporal para verificar la cuenta
    const token = await new Token({
      userID: newUser._id,
      token: uuidv4()
    }).save()

    //envio del email de activacion
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${newUser._id}/verify/${token.token}`
    const emailContent = `<p>Click the link below to verify your account</p><a href="${url}">LINK</a>`
    await sendEmail(newUser.email, "Verify your email", emailContent)

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
