import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password id required"],
      minlength: [6, "Password must have at least 6 characters"],
      trim: true,
    },
    isProfessional: {
      type: Boolean,
      require: true,
    },
    token: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

export default models.User || model("User", userSchema);
