import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";
import type { RoleRequest, RoleResponse } from "../model/role-model";

export class RoleController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result: RoleResponse[] = await RoleService.getAll();

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByRoleId(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId: number = parseInt(req.params.roleId) as number;
      const result: any = await RoleService.findByRoleId(roleId);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RoleRequest = req.body as RoleRequest;
      const result: any = await RoleService.store(request);

      return res.status(200).json({
        statusCode: 200,
        message: "save role success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByRoleId(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId: number = parseInt(req.params.roleId) as number;
      const request: RoleRequest = req.body as RoleRequest;
      const result: RoleResponse = await RoleService.updateByRoleId(
        roleId,
        request
      );

      return res.status(200).json({
        statusCode: 200,
        message: "update role success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const roleId: number = parseInt(req.params.roleId) as number;
      const result: RoleResponse = await RoleService.destroyByRoleId(roleId);

      return res.status(200).json({
        statusCode: 200,
        message: "destroy role success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
