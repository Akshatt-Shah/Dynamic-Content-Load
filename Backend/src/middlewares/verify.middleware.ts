import jwt from "jsonwebtoken";
import config from "config";
import { NextFunction, Request, Response } from "express";

export interface NewRequest extends Request {
  user: { id: string; token: string; role: string };
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied.", status: false });
  }
  try {
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: error.message, status: false });
  }
};
