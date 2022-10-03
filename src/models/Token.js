import { Schema, model, models } from "mongoose";

const TokenSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
      unique: true
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 }
  });


export default models.Token || model("Token", TokenSchema);
