export default abstract class UserRepository {
  abstract add(userData: User): Promise<User | null>;
  abstract get(uid: string): Promise<User | null>;
  abstract edit(uid: string, data: User): Promise<User | null>;
  abstract delete(uid: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
}
