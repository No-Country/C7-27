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

    let url = "";
    if (process.env.NEXT_PUBLIC_API_URL) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/${user._id}/NewPassword`;
    } else {
      url = `https://${process.env.VERCEL_URL}/${user._id}/NewPassword`;
    }

    const emailContent = `<p>Click the link below to change your password</p><a href="${url}">LINK</a>`;
    const subject = "Change your email";

    await sendEmail(email, subject, emailContent);
    return res.json(user);
  } catch (e) {
    return res.status(400).json({ msg: e.mesage });
  }
}
