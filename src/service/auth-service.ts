import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  type ResetPasswordRequest,
  type LoginRequest,
  type LoginResponse,
  type RegisterRequest,
  toResetPasswordResponse,
  type ResetPasswordResponse,
  type DataEmail,
  type UpdatePasswordRequest,
  toUpdatePasswordResponse,
  type UpdatePasswordResponse,
} from "../model/auth-model";
import { DateUtils } from "../utils/date-utils";
import { SendEmailUtils } from "../utils/send-email-utils";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";
import Jwt, { type JwtPayload } from "jsonwebtoken";

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
      throw new ErrorResponse(404, "username or password is wrong");
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

  static async resetPasswordByEmail(
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const requestBody: ResetPasswordRequest = Validation.validate(
      AuthValidation.ResetPasswordRequest,
      request
    );

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!isEmailExist) {
      throw new ErrorResponse(404, "email not exist");
    }

    const generateToken: number = Math.floor(1000 + Math.random() * 9000);

    const isResetPasswordExist = await prisma.password_reset.findUnique({
      where: {
        user_id: isEmailExist.id,
      },
    });

    if (isResetPasswordExist) {
      await prisma.$transaction([
        prisma.password_reset.delete({
          where: {
            user_id: isEmailExist.id,
          },
        }),
      ]);
    }

    const date = new Date();
    const expiredAt = await DateUtils.addMinutes(date, 10);

    await prisma.$transaction([
      prisma.password_reset.create({
        data: {
          token: generateToken,
          user_id: isEmailExist.id,
          expired_at: expiredAt,
        },
      }),
    ]);

    const dataEmail: DataEmail = {
      from: "rijal.1344@gmail.com",
      to: isEmailExist.email,
      subject: "token reset password",
      text: `Dear ${isEmailExist.email}, here is the token reset password, ${generateToken}`,
    };

    await SendEmailUtils.send(dataEmail);

    const token = Jwt.sign(
      {
        isResetPassword: true,
      },
      process.env.JWT_KEY as string,
      { expiresIn: 600000 }
    );

    return toResetPasswordResponse(token);
  }

  static async updatePasswordByOtp(
    request: UpdatePasswordRequest
  ): Promise<UpdatePasswordResponse> {
    const requestBody: UpdatePasswordRequest = Validation.validate(
      AuthValidation.UpdatePasswordRequest,
      request
    );

    try {
      Jwt.verify(
        requestBody.token,
        process.env.JWT_KEY as string
      ) as JwtPayload;
    } catch (error) {
      throw new ErrorResponse(404, "token invalid");
    }

    const isResetPassword = await prisma.password_reset.findUnique({
      where: {
        token: requestBody.otp,
      },
    });

    if (!isResetPassword) {
      throw new ErrorResponse(404, "otp invalid");
    }

    const currentTimeStamp: Date = new Date();

    if (currentTimeStamp > isResetPassword.expired_at) {
      throw new ErrorResponse(404, "otp expired");
    }

    const newPassword = await Bun.password.hash(requestBody.password);

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: isResetPassword.user_id,
        },
        data: {
          password: newPassword,
        },
      }),
    ]);

    return toUpdatePasswordResponse(user);
  }
}
