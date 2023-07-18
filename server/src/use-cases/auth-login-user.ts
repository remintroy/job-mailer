import TokensRepository from "../adaptor/repository/tokensRepository";
import UserRepository from "../adaptor/repository/userRepository";
import GetJwt from "../lib/jwt";
import Password from "../lib/password";
import GetUtils from "../lib/utils";
import { userAccessCheckWithData } from "./internal/user-access-check";

export default async function loginUserWithEmailAndPassword(
  userRepository: UserRepository,
  tokensRepository: TokensRepository,
  getPassword: Password,
  jwt: GetJwt,
  utils: GetUtils,
  data: { email: string; password: string; userAgent: string }
) {
  let { email, password, userAgent } = data;

  if (!email) throw utils.createError(400, "email is required to login");
  if (!password) throw utils.createError(400, "password is  required to login");

  if (typeof email !== "string") throw utils.createError(400, "email must be a string");
  if (typeof password !== "string") throw utils.createError(400, "password must be a string");

  email = email?.trim();
  password = password?.trim();

  const userDataFromDatabase = await userRepository.getByEmail(email).catch(utils.throwInternalError("error while fetching user data"));
  if (!userDataFromDatabase) throw utils.createError(400, "account with this email not exist");
  const passwordHashToCompare = userDataFromDatabase?.password;
  const passwordMatched = await getPassword.verify(passwordHashToCompare, password);
  if (!passwordMatched) throw utils.createError(400, "incorrect password provided");

  const userAccessCheck = await userAccessCheckWithData(userDataFromDatabase, utils);

  // IF user need to be verified with email, check here
  // ...

  const tokens = jwt.generateTokens({ uid: userAccessCheck?.uid });

  await tokensRepository.setRefreshToken(tokens.refreshToken, userAccessCheck.uid, userAgent).catch(utils.throwInternalError("failed to login user"));

  const userDataResponse: UserDataResponse = {
    email: userAccessCheck?.email,
    uid: userAccessCheck?.uid,
    name: userAccessCheck?.name,
    phone: userAccessCheck?.phone,
    portfolio: userAccessCheck?.portfolio,
    expectedSalary: userAccessCheck?.expectedSalary,
    disabled: userAccessCheck?.disabled,
    hasAppEmail: userAccessCheck?.app_email?.length >= 4,
    hasAppPassword: userAccessCheck?.app_passw?.length >= 4,
    tokens: tokens,
  };

  return userDataResponse;
}
