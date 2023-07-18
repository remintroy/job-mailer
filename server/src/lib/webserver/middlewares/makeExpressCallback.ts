import { Response } from "express";
import { RequestWithUser } from "../../../types.dynamic";

/**
 * Express callback generator which creates and handles errors from controller functions.
 * @param controller Controller Promise function to be executed
 * @returns a callback for express
 */
export default function makeExpressCallback(controller: any) {
  return async (req?: RequestWithUser, res?: Response) => {
    try {
      const response = await controller(req, res);
      res.send(response);
    } catch (error) {
      res.status(error?.code ? error.code : 500);
      res.send(error);
    }
  };
}
