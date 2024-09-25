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
      statusCode: 401,
      errors: "unauthorized",
    });
  }

  const [, token] = tokenQuery.split(" ");

  try {
    const decoded = Jwt.verify(token, process.env.JWT_KEY as string);
    (req as any).id = (decoded as any).id;
    return next();
  } catch (error: any) {
    return res.status(401).json({
      statusCode: 401,
      errors: error.errors.message,
    });
  }
};
