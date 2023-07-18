export default abstract class UserRepository {
  // CRED operations
  abstract add(userData: User): any;
  abstract get(uid: string): Promise<User | null>;
  abstract edit(uid: string, data: User): Promise<User | null>;
  abstract delete(uid: string): Promise<User | null>;
  // Additional operations
  abstract getByEmail(email: string): Promise<User | null>;
}
