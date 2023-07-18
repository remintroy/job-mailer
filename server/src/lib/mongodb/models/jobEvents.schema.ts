import { Schema } from "mongoose";

type jobEventSchema = JobEvent;

const jobEventSchema = new Schema(
  {
    type: String,
    date: Date,
    user: {},
    company: {},
    template: String,
    error: {},
  },
  {
    timestamps: true,
  }
);

export default jobEventSchema;
