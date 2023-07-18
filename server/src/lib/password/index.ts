import bcrypt from "bcryptjs";

export default class Password {
  private salt: number;

  constructor(options: { salt?: number }) {
    this.salt = options.salt || 10;
  }

  /**
   * Get hasted password
   * @param password Non hashed password
   */
  create(password: string) {
    return bcrypt.hash(password, this.salt);
  }

  /**
   * Compare hashed and non hashed password
   * @param passwordHash Hashed password
   * @param password Non hashed password to compare against
   * @returns Promise<Verification status>
   */
  verify(passwordHash: string, password: string) {
    return bcrypt.compare(password, passwordHash);
  }
}
