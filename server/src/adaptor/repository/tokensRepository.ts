export default abstract class TokensRepository {
  abstract get(token: string): Promise<Tokens>;
  abstract edit(token: string, data: Tokens): Promise<Tokens>;
  abstract setToken(token: string, uid: string, userAgent: string): Promise<Tokens>;
  abstract setRefreshToken(token: string, uid: string, userAgent: string): Promise<Tokens>;
  abstract delete(token: string): Promise<Tokens>;
  abstract getTokensUid(uid: string): Promise<Tokens[]>;
  abstract deleteTokensByUid(uid: string): Promise<Tokens[]>;
  abstract incrimentRefershCount(token: string): Promise<Tokens>;
}
