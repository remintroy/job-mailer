import TokensRepository from "../adaptor/repository/tokensRepository";
import UserRepository from "../adaptor/repository/userRepository";
import GetJwt from "../lib/jwt";
import GetUtils from "../lib/utils";
import userAccessCheckWithRepositroy from "./internal/user-access-check";

export default async function refreshAccessToken(
  userRepository: UserRepository,
  tokensRepository: TokensRepository,
  jwt: GetJwt,
  utils: GetUtils,
  data: { refreshToken: string }
) {
  if (!data?.refreshToken) throw utils.createError(400, "refresh token is required");
  //..
  const tokenFromDb = await tokensRepository.get(data?.refreshToken).catch(utils.throwInternalError("faild to fetch tokens for user"));
  if (!tokenFromDb) throw utils.createError(401, "no session found with refresh token");
  //..
  const uid = jwt.verifyRefreshToken(data?.refreshToken)?.uid;
  const userData = await userAccessCheckWithRepositroy(userRepository, utils, uid);
  const accessToken = jwt.generateAccessToken({ uid: userData?.uid });

  await userRepository.edit(userData.uid, { lastRefresh: new Date() });
  await tokensRepository.incrimentRefershCount(data?.refreshToken);

  return {
    accessToken,
  };
}
