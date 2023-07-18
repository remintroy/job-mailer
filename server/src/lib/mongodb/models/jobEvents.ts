import { model } from "mongoose";
import jobEventSchema from "./jobEvents.schema";

const JobEventModel = model<jobEventSchema>("jobEvents", jobEventSchema);

export default JobEventModel;
