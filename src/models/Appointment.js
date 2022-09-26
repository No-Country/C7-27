import { Schema, model, models } from "mongoose";

const appointmentSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    patientRef: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    professionalRef: {
      type: Schema.Types.ObjectId,
      ref: "Professional",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Appointment ||
  model("Appointment", appointmentSchema).create();
