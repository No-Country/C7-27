import { v4 as uuidv4 } from "uuid";
import Token from "../models/Token";
import sendEmail from "../utils/sendEmail";

export default async function verificationEmail(userID, userEmail) {
  try {
    //creacion del token temporal para verificar la cuenta
    let token;

    const tokenAlreadyExists = await Token.findOne({ userID });

    if (tokenAlreadyExists) {
      token = tokenAlreadyExists.token;
    } else {
      token = await new Token({
        userID: userID,
        token: uuidv4(),
      }).save();
    }

    //envio del email de activacion
    const url = `${
      process.env.NEXT_PUBLIC_VERCEL_URL}/api/users/${userID}/verify/${token.token}`;
    const emailContent = `<p>Click the link below to verify your account</p><a href="${url}">LINK</a>`;
    await sendEmail(userEmail, "Verify your email", emailContent);
  } catch (e) {
    console.log(e.message);
  }
}
