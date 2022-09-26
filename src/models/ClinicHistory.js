import { Schema, model, models } from "mongoose";

const clinicHistorySchema = new Schema(
  {
    observations: {
      type: [
        {
          speciality: {
            type: [
              {
                date: {
                  type: String,
                },
                observation: {
                  type: String,
                },
              },
            ],
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.ClinicHistory ||
  model("ClinicHistory", clinicHistorySchema);
