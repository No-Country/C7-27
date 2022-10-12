import { Schema, model, models } from "mongoose";

const medicalInsuranceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    initials: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.MedicalInsurance ||
  model("MedicalInsurance", medicalInsuranceSchema);
