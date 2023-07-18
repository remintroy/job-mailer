/**
 * Error handlier for not found 404
 * @param req Express Request
 * @param res Express Response
 */
export default function notFoundMiddleware(req: any, res: any) {
  res.status(404);
  res.send({ code: 404, status: "The service you are looking for is not on this server", message: "Not found" });
}
