import { Schema } from "mongoose";

type userSchema = User;

const userSchema = new Schema(
  {
    uid: String,
    name: String,
    email: String,
    password: String,
    phone: String,
    portfolio: String,
    expectedSalary: String,
    app_email: String,
    app_passw: String,
    deleted: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    lastRefresh: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
