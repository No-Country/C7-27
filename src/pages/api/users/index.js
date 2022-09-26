import { dbConnect } from "../../../utils/dbConnect";
import User from "../../../models/User";
import Patient from "../../../models/Patient";
import Professional from "../../../models/Professional";
import ClinicHistory from "../../../models/ClinicHistory";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      const { email, password } = body;

      const user = await User.findOne({ email }).select(
        "-createdAt -updatedAt"
      );

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
          .select("-createdAt -updatedAt");

        if (!professionalUser) {
          const error = new Error("Professional not found");
          return res.status(400).json({ msg: error.message });
        }
        return res.status(200).json({ ...user._doc, ...professionalUser._doc });
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

        return res.status(200).json({ ...user._doc, ...patientUser._doc });
      }
    case "POST":
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

        // condicional si es profesional o no
        if (body.isProfessional) {
          // si es profesional

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
        } else {
          // si no es profesional

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
        }
      } catch (e) {
        return res.status(400).json({ msg: e.message });
      }
    case "PUT":
      return res.json({ msg: "User updated" });
    case "DELETE":
      const { id } = body;
      try {
        const user = await User.findById(id);

        if (!user) {
          const error = new Error("User not found");
          return res.status(400).json({ msg: error.message });
        }

        if (user.isProfessional) {
          const professional = await Professional.findById(
            user.professionalRef.toString()
          );

          if (professional.appointmentsRef.length > 0) {
            professional.AppointmentsRef.forEach(async (appointment) => {
              await Appointment.findByIdAndRemove(appointment._id);
            });
          }

          await Professional.findByIdAndRemove(professional._id);
          await User.findByIdAndDelete(id);
        } else {
          const patient = await Patient.findById(user.patientRef.toString());

          if (patient.appointmentsRef.length > 0) {
            patient.AppointmentsRef.forEach(async (appointment) => {
              await Appointment.findByIdAndRemove(appointment._id);
            });
          }

          await ClinicHistory.findByIdAndDelete(
            patient.clinicHistoryRef.toString()
          );
          await Patient.findByIdAndRemove(patient._id);
          await User.findByIdAndDelete(id);
        }
        return res.json({ msg: "User deleted" });
      } catch (e) {
        res.status(400).json({ msg: e.message });
      }

    default:
      return;
  }
}
