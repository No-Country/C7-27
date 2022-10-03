import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";
import Professional from "../../../models/Professional";

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
      isProfessional: true,
    });

    // creo el registro de profesioanl
    const newProfessional = new Professional({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
      phoneNumber: body.phoneNumber,
      specialities: body.specialities,
      medicalInsuranceList: body.medicalInsuranceList,
      days: body.days,
    });

    newUser.professionalRef = newProfessional._id;
    const savedUser = await newUser.save();
    await newProfessional.save();
    return res.status(201).json(savedUser);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
