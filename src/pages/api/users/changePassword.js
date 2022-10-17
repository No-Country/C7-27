import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  if (method !== "PUT")
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  try {
    const { id, password } = body;
    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      return res.status(400).json({ msg: error.message });
    }
    user.password = password;
    await user.save();
    return res.json(user);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
