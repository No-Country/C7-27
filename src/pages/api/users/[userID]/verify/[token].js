import { dbConnect } from "../../../../../config/dbConnect"
import User from "../../../../../models/User"
import Token from "../../../../../models/Token"

dbConnect()

export default async function verifyHandler(req, res) {

  const { token, userID } = req.query
  try {

    const tokenExists = await Token.findOne({ token });

    if (!tokenExists) {
      const error = new Error("Token expired");
      return res.status(400).json({ msg: error.message });
    }

    await Token.deleteOne({ token })

    await User.findOneAndUpdate({ _id: userID }, { verified: true })
    return res.status(201).json('Account activated');

  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
}
