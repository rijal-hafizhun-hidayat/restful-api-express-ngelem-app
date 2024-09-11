import type { NextFunction, Request, Response } from "express";
import { ProfileService } from "../service/profile-service";
import type {
  ProfileResponse,
  UpdateProfileNameRequest,
} from "../model/profile-model";

export class ProfileController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.get("Authorization") as string;
      const result: ProfileResponse = await ProfileService.getProfile(token);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfileName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token: string = req.get("Authorization") as string;
      const request: UpdateProfileNameRequest =
        req.body as UpdateProfileNameRequest;
      const result: UpdateProfileNameRequest =
        await ProfileService.updateProfileName(token, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfilePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
