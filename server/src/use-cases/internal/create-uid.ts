import UserRepository from "../../adaptor/repository/userRepository";
import GetUtils from "../../lib/utils";

export default async function createUid(userRepository: UserRepository, utils: GetUtils) {
  let uid = "";
  do {
    uid = utils.generateRandomId();
  } while (await userRepository.get(uid));
  return uid;
}
