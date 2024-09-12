import type { NextFunction, Request, Response } from "express";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../model/auth-model";
import { AuthService } from "../service/auth-service";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const result = await AuthService.login(request);

      return res.status(200).json({
        statusCode: 200,
        message: "login success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const result: LoginResponse = await AuthService.register(request);

      return res.status(200).json({
        statusCode: 200,
        message: "register success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
