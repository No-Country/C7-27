import { Schema, model, models } from "mongoose";

const patientSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Patient email is required"],
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    birthday: {
      type: String,
      require: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      trim: true,
    },
    medicalInsurance: {
      type: String,
    },
    bloodType: {
      type: String,
    },
    appointmentsRef: {
      type: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
      default: [],
    },
    clinicHistoryRef: {
      type: Schema.Types.ObjectId,
      ref: "ClinicHistory",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Patient || model("Patient", patientSchema);
