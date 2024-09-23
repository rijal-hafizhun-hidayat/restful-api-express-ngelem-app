import Jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "../app/database";
import {
  toEmailResetResponse,
  toProfileResponse,
  toUpdateEmailResponse,
  toUpdateProfileImageResponse,
  toUpdateProfileNameResponse,
  type ProfileResponse,
  type SendOtpChangeEmailRequest,
  type UpdateEmailByOtpRequest,
  type UpdateProfileImageResponse,
  type UpdateProfileNameRequest,
  type UpdateProfilePasswordRequest,
} from "../model/profile-model";
import { ErrorResponse } from "../error/error-response";
import { Validation } from "../validation/validation";
import { ProfileValidation } from "../validation/profile-validation";
import { DateUtils } from "../utils/date-utils";
import type { DataEmail } from "../model/auth-model";
import { SendEmailUtils } from "../utils/send-email-utils";
import { StoreFile } from "../utils/store-file";

export class ProfileService {
  static async getProfile(token: string): Promise<ProfileResponse> {
    const [typeToken, valueToken] = token.split(" ");

    const decoded = Jwt.verify(
      valueToken,
      process.env.JWT_KEY as string
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toProfileResponse(user);
  }

  static async updateProfileName(
    token: string,
    request: UpdateProfileNameRequest
  ): Promise<UpdateProfileNameRequest> {
    const [typeToken, valueToken] = token.split(" ");

    const decoded = Jwt.verify(
      valueToken,
      process.env.JWT_KEY as string
    ) as JwtPayload;

    const requestBody: UpdateProfileNameRequest = Validation.validate(
      ProfileValidation.UpdateProfileNameRequest,
      request
    );

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: decoded.id,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toUpdateProfileNameResponse(user);
  }

  static async updateProfilePassword(
    token: string,
    request: UpdateProfilePasswordRequest
  ): Promise<ProfileResponse> {
    const requestBody: UpdateProfilePasswordRequest = Validation.validate(
      ProfileValidation.UpdateProfilePasswordRequest,
      request
    );

    const [typeToken, valueToken] = token.split(" ");

    const decoded = Jwt.verify(
      valueToken,
      process.env.JWT_KEY as string
    ) as JwtPayload;

    const isUserExist = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const isMatch = await Bun.password.verify(
      requestBody.confirmationPassword,
      isUserExist.password
    );

    if (!isMatch) {
      throw new ErrorResponse(404, "password not match");
    }

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: decoded.id,
        },
        data: {
          password: await Bun.password.hash(requestBody.newPassword),
        },
      }),
    ]);

    return toProfileResponse(user);
  }

  static async sendOtpChangeEmail(
    request: SendOtpChangeEmailRequest
  ): Promise<SendOtpChangeEmailRequest> {
    const requestBody: SendOtpChangeEmailRequest = Validation.validate(
      ProfileValidation.SendOtpChangeEmailRequest,
      request
    );

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!isUserExist) {
      throw new ErrorResponse(404, "email not found");
    }

    const generateOtp: number = Math.floor(1000 + Math.random() * 9000);

    const isEmailResetExist = await prisma.email_reset.findUnique({
      where: {
        user_id: isUserExist.id,
      },
    });

    if (isEmailResetExist) {
      await prisma.$transaction([
        prisma.email_reset.delete({
          where: {
            user_id: isUserExist.id,
          },
        }),
      ]);
    }

    const date = new Date();
    const expiredAt = await DateUtils.addMinutes(date, 10);

    await prisma.$transaction([
      prisma.email_reset.create({
        data: {
          user_id: isUserExist.id,
          otp: generateOtp,
          expired_at: expiredAt,
        },
      }),
    ]);

    const dataEmail: DataEmail = {
      from: "rijalhidayat79@gmail.com",
      to: isUserExist.email,
      subject: "change email",
      text: `Dear ${isUserExist.email}, here is the otp change email, ${generateOtp}`,
    };

    await SendEmailUtils.send(dataEmail);

    return toEmailResetResponse(isUserExist);
  }

  static async updateEmailByOtp(
    request: UpdateEmailByOtpRequest
  ): Promise<SendOtpChangeEmailRequest> {
    const requestBody: UpdateEmailByOtpRequest = Validation.validate(
      ProfileValidation.UpdateEmailByOtpRequest,
      request
    );

    const isEmailResetExist = await prisma.email_reset.findUnique({
      where: {
        otp: requestBody.otp,
      },
    });

    if (!isEmailResetExist) {
      throw new ErrorResponse(404, "token invalid");
    }

    const currentTimeStamp: Date = new Date();

    if (currentTimeStamp > isEmailResetExist.expired_at) {
      throw new ErrorResponse(404, "token expired");
    }

    const isEmailAlreadyExist = await prisma.user.findUnique({
      where: {
        email: requestBody.newEmail,
      },
    });

    if (isEmailAlreadyExist) {
      throw new ErrorResponse(404, "email already exist");
    }

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: isEmailResetExist.user_id,
        },
        data: {
          email: requestBody.newEmail,
        },
      }),
    ]);

    return toUpdateEmailResponse(user);
  }

  static async updateProfileImage(
    token: string,
    file: Express.Multer.File
  ): Promise<UpdateProfileImageResponse> {
    const [typeToken, valueToken] = token.split(" ");

    const decoded = Jwt.verify(
      valueToken,
      process.env.JWT_KEY as string
    ) as JwtPayload;

    Validation.validate(ProfileValidation.UpdateProfileImageRequest, file);

    const filePath = await StoreFile.storePhoto(file, "uploads");

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: decoded.id,
        },
        data: {
          avatar: filePath,
        },
      }),
    ]);

    return toUpdateProfileImageResponse(user);
  }
}
