import { Schema, model, models } from "mongoose";

const daySchema = new Schema(
  {
    day: {
      type: String,
    },
    availability: {
      type: String,
    },
  },
  { _id: false }
);

const professionalSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Professioanl email is required"],
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
    specialities: {
      type: [String],
    },
    medicalInsuranceList: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    appointmentsRef: {
      type: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
      default: [],
    },
    days: {
      type: [daySchema],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Professional || model("Professional", professionalSchema);
