import TokensRepository from "../../../adaptor/repository/tokensRepository";
import TokensModel from "../models/tokens";

export default class TokensRepositoryImpl implements TokensRepository {
  setToken(token: string, uid: string, userAgent: string): Promise<Tokens> {
    return new TokensModel({ value: token, uid, userAgent }).save();
  }

  setRefreshToken(token: string, uid: string, userAgent: string): Promise<Tokens> {
    return new TokensModel({ value: token, uid, userAgent, typeofToken: "refresh" }).save();
  }

  edit(token: string, data: Tokens): Promise<Tokens> {
    return TokensModel.findOneAndUpdate({ value: token }, { $set: data });
  }

  incrimentRefershCount(token: string): Promise<Tokens> {
    return TokensModel.findOneAndUpdate({ value: token }, { $inc: { refreshCount: 1 } });
  }

  get(token: string): Promise<Tokens> {
    return TokensModel.findOne({ value: token });
  }

  delete(token: string): Promise<Tokens> {
    return TokensModel.findOneAndDelete({ value: token });
  }

  async deleteTokensByUid(uid: string): Promise<Tokens[]> {
    const tokens = await TokensModel.find({ uid });
    await TokensModel.deleteMany({ uid });
    return tokens;
  }

  getTokensUid(uid: string): Promise<Tokens[]> {
    return TokensModel.find({ uid });
  }
}
