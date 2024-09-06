import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toUserResponse,
  type UserRequest,
  type UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async getAll(): Promise<any> {
    const users = await prisma.user.findMany({});

    return users;
  }

  static async store(request: UserRequest): Promise<UserResponse> {
    const requestBody: UserRequest = Validation.validate(
      UserValidation.UserRequest,
      request
    );

    const isEmailExists = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailExists) {
      throw new ErrorResponse(404, "email already taken");
    }

    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: await Bun.password.hash(requestBody.password as string),
          avatar: "avatar.png",
        },
      }),
    ]);

    return toUserResponse(user);
  }

  static async findByUserId(userId: number): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toUserResponse(user);
  }

  static async updateByUserId(
    userId: number,
    request: UserRequest
  ): Promise<UserResponse> {
    const requestBody: UserRequest = Validation.validate(
      UserValidation.UpdateUserRequest,
      request
    );

    const isEmailExists = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailExists) {
      throw new ErrorResponse(404, "email already taken");
    }

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: requestBody.name,
          email: requestBody.email,
          avatar: "avatar.png",
        },
      }),
    ]);

    return toUserResponse(user);
  }

  static async destroyByUserId(userId: number): Promise<UserResponse> {
    const isUserExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [user] = await prisma.$transaction([
      prisma.user.delete({
        where: {
          id: userId,
        },
      }),
    ]);

    return toUserResponse(user);
  }
}
