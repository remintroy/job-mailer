import UserRepository from "../../adaptor/repository/userRepository";
import GetUtils from "../../lib/utils";

export async function userAccessCheckWithData(userData:User, uitls: GetUtils) {
  if (!userData) throw uitls.createError(400, "User not existis");
  if (userData.disabled) throw uitls.createError(400, "User is disabled");
  return userData;
}

export default async function userAccessCheckWithRepositroy(userRepository: UserRepository, uitls: GetUtils, uid: string) {
  const userData = await userRepository.get(uid).catch(uitls.throwInternalError("Error fetching user data"));
  if (!userData) throw uitls.createError(400, "User not existis");
  if (userData.disabled) throw uitls.createError(400, "User is disabled");
  return userData;
}
