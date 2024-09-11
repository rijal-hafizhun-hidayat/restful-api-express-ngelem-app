import Jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "../app/database";
import {
  toProfileResponse,
  toUpdateProfileNameResponse,
  type ProfileResponse,
  type UpdateProfileNameRequest,
} from "../model/profile-model";
import { ErrorResponse } from "../error/error-response";
import { Validation } from "../validation/validation";
import { ProfileValidation } from "../validation/profile-validation";

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
}
