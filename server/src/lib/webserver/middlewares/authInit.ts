import GetJwt from "../../jwt";

/**
 * @param userJwt User jwt intance with user config
 * @param adminJwt Admin jwt intance with admin config which is optional
 * @returns A middleware for express
 */
export default function createAuthInit({ userJwt, adminJwt }: { userJwt?: GetJwt; adminJwt?: GetJwt }) {
  return async (req: any, _: any, next: any) => {
    const accessToken = req.headers?.authorization?.split(" ")?.[1];
    // user
    if (userJwt) {
      try {
        req.user = userJwt.verifyAccessToken(accessToken)?.uid || null;
      } catch (error) {
        req.user = null;
      }
    } else {
      req.user = null;
    }
    // admin
    if (adminJwt) {
      try {
        req.admin = adminJwt.verifyAccessToken(accessToken)?.email || null;
      } catch (error) {
        req.admin = null;
      }
    } else {
      req.admin = null;
    }
    next();
  };
}
