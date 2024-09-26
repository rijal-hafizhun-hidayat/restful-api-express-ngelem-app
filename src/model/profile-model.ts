import type { user } from "@prisma/client";

export type ProfileResponse = {
  name: string;
  email: string;
  avatar: string;
};

export type UpdateProfileNameRequest = {
  name: string;
};

export type UpdateProfilePasswordRequest = {
  newPassword: string;
  confirmationPassword: string;
};

export type UpdateProfileImageResponse = {
  avatar: string;
};

export type SendOtpChangeEmailRequest = {
  email: string;
};

export type UpdateEmailByOtpRequest = {
  otp: number;
  oldEmail: string;
  newEmail: string;
};

export function toProfileResponse(user: user): ProfileResponse {
  return {
    name: user.name,
    email: user.email,
    avatar:
      (process.env.BASE_URL as string) + "/storage/profile/" + user.avatar,
  };
}

export function toUpdateProfileNameResponse(
  user: user
): UpdateProfileNameRequest {
  return {
    name: user.name,
  };
}

export function toEmailResetResponse(user: user): SendOtpChangeEmailRequest {
  return {
    email: user.email,
  };
}

export function toUpdateEmailResponse(user: user): SendOtpChangeEmailRequest {
  return {
    email: user.email,
  };
}

export function toUpdateProfileImageResponse(
  user: user
): UpdateProfileImageResponse {
  return {
    avatar: user.avatar,
  };
}
