import UserRepository from "../../../adaptor/repository/userRepository";
import UserModel from "../models/user";

export default class UserRepositoryImpl implements UserRepository {
  add(userData: User) {
    return new UserModel(userData).save();
  }

  get(uid: string) {
    return UserModel.findOne({ uid: uid, deleted: false });
  }

  edit(uid: string, data: User) {
    return UserModel.findOneAndUpdate({ uid }, { $set: data });
  }

  delete(uid: string) {
    // Soft delete
    return UserModel.findOneAndUpdate({ uid }, { $set: { uid: `${uid}_deleted`, deleted: true } });
  }

  // Additional operations
  getByEmail(email: string) {
    return UserModel.findOne({ email, deleted: false });
  }
}
