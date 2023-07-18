import { Schema } from "mongoose";

type companySchema = Company;

const companySchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    otherContact: [String],
    hrName: String,
    stacks: [String],
    applied: Boolean,
    appliedAt: Date,
    events: [],
    responded: Boolean,
    expectedSalary: String,
    respondedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default companySchema;
