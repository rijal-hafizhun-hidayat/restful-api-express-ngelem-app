import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  type LoginRequest,
  type LoginResponse,
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
      throw new ErrorResponse(404, "username of password is wrong");
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
}
