import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "GET") {
    try {
      const professionals = await User.find(
        { isProfessional: true },
        "professionalRef"
      )
        .populate({
          path: "professionalRef",
          select: "_id firstName lastName specialities",
        })
        .select("-_id");

      return res.json(professionals);
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}
