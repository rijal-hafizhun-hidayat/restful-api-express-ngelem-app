import type { NextFunction, Request, Response } from "express";
import type {
  UserPasswordRequest,
  UserRequest,
  UserResponse,
} from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await UserService.getAll();

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserRequest = req.body as UserRequest;
      const result: UserResponse = await UserService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.userId) as number;
      const result: UserResponse = await UserService.findByUserId(userId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.userId) as number;
      const request: UserRequest = req.body as UserRequest;
      const result: UserResponse = await UserService.updateByUserId(
        userId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId: number = parseInt(req.params.userId) as number;
      const result: UserResponse = await UserService.destroyByUserId(userId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePasswordByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId: number = parseInt(req.params.userId) as number;
      const request: UserPasswordRequest = req.body as UserPasswordRequest;
      const result: UserResponse = await UserService.updatePasswordByUserId(
        userId,
        request
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
