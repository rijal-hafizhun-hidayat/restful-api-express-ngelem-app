import type { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenQuery: string = req.get("Authorization") as string;

  if (!tokenQuery) {
    res
      .status(401)
      .json({
        statusCode: 401,
        errors: "unauthorized",
      })
      .end();
  }

  const [typeToken, token] = tokenQuery.split(" ");

  try {
    Jwt.verify(token, process.env.JWT_KEY as string);
    next();
  } catch (error: any) {
    res
      .status(401)
      .json({
        statusCode: 401,
        errors: error.errors.message,
      })
      .end();
  }
};
