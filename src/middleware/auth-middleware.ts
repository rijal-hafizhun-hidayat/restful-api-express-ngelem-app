import type { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenQuery: string = req.get("Authorization") as string;

  if (!tokenQuery) {
    return res.status(401).json({
      data: "unauthorized",
    });
  }

  const [typeToken, token] = tokenQuery.split(" ");

  try {
    Jwt.verify(token, process.env.JWT_KEY as string);
    next();
  } catch (error) {
    res.status(401).json({
      data: error,
    });
  }
};
