import { Schema } from "mongoose";

type tokenSchema = Tokens;

const tokenSchema = new Schema(
  {
    value: String,
    uid: String,
    userAgent: String,
    typeofToken: String,
    refreshCount: { type: Number, default: 1 },
    lastRefresh: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

export default tokenSchema;
