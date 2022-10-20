import { dbConnect } from "../../../config/dbConnect";
import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    const error = new Error(`${method} method not supported`);
    return res.status(400).json({ msg: error.message });
  }

  try {
    const { email } = body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      return res.status(400).json({ msg: error.message });
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL}/${
      user._id
    }/NewPassword`;
    const emailContent = `<p>Click the link below to change your password</p><a href="${url}">LINK</a>`;
    await sendEmail(email, "Change your email", emailContent);
    return res.json(user);
  } catch (e) {
    return res.status(400).json({ msg: e.mesage });
  }
}
