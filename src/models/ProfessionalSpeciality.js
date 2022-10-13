import { Schema, model, models } from "mongoose";

const professionalSpecialitySchema = new Schema(
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

export default models.ProfessionalSpeciality ||
  model("ProfessionalSpeciality", professionalSpecialitySchema);
