import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRoleResponse,
  type RoleRequest,
  type RoleResponse,
} from "../model/role-model";
import { RoleValidation } from "../validation/role-validation";
import { Validation } from "../validation/validation";

export class RoleService {
  static async getAll(): Promise<RoleResponse[]> {
    const roles = await prisma.role.findMany({});

    return roles;
  }

  static async findByRoleId(roleId: number): Promise<RoleResponse> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    return toRoleResponse(role);
  }

  static async store(request: any): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.RoleRequest,
      request
    );

    const [role] = await prisma.$transaction([
      prisma.role.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(role);
  }

  static async updateByRoleId(
    roleId: number,
    request: RoleRequest
  ): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.RoleRequest,
      request
    );

    const [role] = await prisma.$transaction([
      prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toRoleResponse(role);
  }

  static async destroyByRoleId(roleId: number): Promise<RoleResponse> {
    const isRoleExist = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!isRoleExist) {
      throw new ErrorResponse(404, "role not found");
    }

    const [role] = await prisma.$transaction([
      prisma.role.delete({
        where: {
          id: roleId,
        },
      }),
    ]);

    return toRoleResponse(role);
  }
}
