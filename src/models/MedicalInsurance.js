import { Schema, model, models } from "mongoose";

const medicalInsurance = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.MedicalInsurance ||
  model("MedicalInsurance", medicalInsurance).create();
