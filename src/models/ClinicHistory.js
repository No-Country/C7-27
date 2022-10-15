import { Schema, model, models } from "mongoose";

const clinicHistorySchema = new Schema(
  {
    history: {
      type: [{
        speciality: {
          type: String,
          required: true,
        },
        details: {
          type: [{
            date: {
              type: String,
              required: true,
            },
            professionalName: {
              type: String,
              required: true,
            },
            professionalRef: {
              type: Schema.Types.ObjectId,
              ref: "Professional",
              required: true,
            },
            observations: {
              type: String,
              required: true,
            },
          }]
        },
      }]
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.ClinicHistory ||
  model("ClinicHistory", clinicHistorySchema);
