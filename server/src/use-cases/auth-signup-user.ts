import TokensRepository from "../adaptor/repository/tokensRepository";
import UserRepository from "../adaptor/repository/userRepository";
import GetJwt from "../lib/jwt";
import Password from "../lib/password";
import GetUtils from "../lib/utils";
import createUid from "./internal/create-uid";

export default async function signupUserWithEmailAndPassword(
  userRepository: UserRepository,
  tokensRepository: TokensRepository,
  getPassword: Password,
  jwt: GetJwt,
  utils: GetUtils,
  data: { email: string; password: string; name: string; userAgent: string }
) {
  if (!data.email) throw utils.createError(400, "email is required");
  if (!data.name) throw utils.createError(400, "name is required");
  if (!data.password) throw utils.createError(400, "password is required");

  if (typeof data.email !== "string") throw utils.createError(400, "email must be a string");
  if (typeof data.name !== "string") throw utils.createError(400, "name must be a string");
  if (typeof data.password !== "string") throw utils.createError(400, "password must be a string");

  data.email = data.email.trim().toLowerCase();
  data.name = data.name.trim().toLowerCase();
  data.password = data.password.trim();

  if (data.password.length < 6) throw utils.createError(400, "password must be at least 6 characters long");
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data?.email)) throw utils.createError(400, "please provide a valid email");

  const existingUserData = await userRepository.getByEmail(data.email).catch(utils.throwInternalError("faild to fetch user data"));
  if (existingUserData) throw utils.createError(400, "user with this email already exists");

  const hashedPassword = await getPassword.create(data.password.trim());
  const newUserId = await createUid(userRepository, utils);

  const newUser: User = {
    uid: newUserId,
    name: data.name?.trim()?.toLowerCase(),
    email: data.email?.trim()?.toLowerCase(),
    password: hashedPassword,
  };

  await userRepository.add(newUser).catch(utils.throwInternalError("Faild to create user"));

  // IF user need to be verified with email, check here
  // ...
  const tokens = jwt.generateTokens({ uid: newUser?.uid });

  await tokensRepository.setRefreshToken(tokens.refreshToken, newUser.uid, data.userAgent).catch(utils.throwInternalError("failed to login user"));

  const userDataResponse: UserDataResponse = {
    email: newUser?.email,
    uid: newUser?.uid,
    name: newUser?.name,
    phone: null,
    portfolio: null,
    expectedSalary: null,
    disabled: false,
    hasAppEmail: false,
    hasAppPassword: false,
    tokens: tokens,
  };

  return userDataResponse;
}
