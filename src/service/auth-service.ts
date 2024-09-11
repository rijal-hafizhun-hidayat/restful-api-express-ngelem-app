import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
} from "../model/auth-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";
import Jwt from "jsonwebtoken";

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.LoginRequest,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(400, "username or password is wrong");
    }

    const isPasswordValid = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ErrorResponse(404, "username or password is wrong");
    }

    const token = Jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    );

    return toLoginResponse(token);
  }

  static async register(request: RegisterRequest): Promise<LoginResponse> {
    const requestBody: RegisterRequest = Validation.validate(
      AuthValidation.RegisterRequest,
      request
    );

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (isEmailExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: await Bun.password.hash(requestBody.password),
          avatar: "avatar.png",
        },
      }),
    ]);

    const token = Jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    );

    return toLoginResponse(token);
  }
}
