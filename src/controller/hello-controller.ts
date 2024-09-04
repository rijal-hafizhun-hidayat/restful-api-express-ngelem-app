import type { NextFunction, Request, Response } from "express";

export class HelloController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        data: "hello world",
      });
    } catch (error) {
      next(error);
    }
  }
}
