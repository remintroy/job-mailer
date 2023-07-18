/**
 * Middleware which allows only authenticated request to pass to next middleware in context of req.user
 * @param req Request Express
 * @param res Response Express
 * @param next NextFunction Express
 */
export default function mustLoginAsUser(req: any, res: any, next: any) {
  if (req.user) next();
  else {
    res.status(401);
    res.send({ code: 401, status: "error", message: "Unauthorized action" });
  }
}
