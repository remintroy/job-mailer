import { Request } from "express";

interface RequestWithUser extends Request {
  user: string | null;
  userData: User | null;
  admin: string | null;
  adminData: null;
}
