import { model } from "mongoose";
import tokenSchema from "./tokens.scheam";

const TokensModel = model<tokenSchema>("tokens", tokenSchema);

export default TokensModel;
