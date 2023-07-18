import { model } from "mongoose";
import companySchema from "./company.schema";

const CompanyModel = model<companySchema>("companys", companySchema);

export default CompanyModel;
