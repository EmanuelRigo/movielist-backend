import { model, Schema } from "mongoose";

const nameCollection = "users";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  mode: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  verifyUser: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: false,
  },
  isOnline: { type: Boolean, default: false },
});

const userModel = model(nameCollection, userSchema);

export default userModel;
