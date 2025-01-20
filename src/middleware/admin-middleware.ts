import type { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../error/error-response";
import { prisma } from "../app/database";
import { AuthUtils } from "../utils/auth-utils";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(req as any).id) {
    return res.status(401).json({
      statusCode: 401,
      errors: "unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: (req as any).id,
    },
    select: {
      user_role: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      errors: "unauthorized",
    });
  }

  const isCompareRole = await AuthUtils.compareRole(
    user.user_role[0]?.role,
    "admin"
  );

  if (isCompareRole) {
    return next();
  }

  return res.status(401).json({
    statusCode: 401,
    errors: "role required not met",
  });
};
