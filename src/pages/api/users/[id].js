import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";
import Patient from "../../../models/Patient";
import Professional from "../../../models/Professional";
import ClinicHistory from "../../../models/ClinicHistory";

dbConnect();

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
}
