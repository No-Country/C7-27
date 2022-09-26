import { dbConnect } from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  const { newPassword, id } = body;
  if (method === "PUT") {
    try {
      const user = await User.findById(id);
      if (!user) {
        const error = new Error("Email not found");
        return res.status(400).json({ msg: error.message });
      }
      if (user.password === newPassword) {
        const error = new Error("The password is the same");
        return res.status(400).json({ msg: error.message });
      }

      user.password = newPassword;
      const savedUser = await user.save();
      return res.json(savedUser);
    } catch (e) {
      return res.status(400).json({ msg: e.message });
    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}
