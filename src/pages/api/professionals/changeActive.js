import { dbConnect } from "../../../config/dbConnect";
import Professional from "../../../models/Professional";

dbConnect();

export default async function changeActive(req, res) {
  const { method, body } = req;

  if (method === "PUT") {
    try {
      const professional = await Professional.findByIdAndUpdate(
        body._id,
        { ...body, isActive: !body.isActive },
        { new: true }
      );
      return res.json(professional);
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(400).json({ msg: "Wrong HTTP Method" });
  }
}
