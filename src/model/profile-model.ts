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

export function toProfileResponse(user: user): ProfileResponse {
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
}

export function toUpdateProfileNameResponse(
  user: user
): UpdateProfileNameRequest {
  return {
    name: user.name,
  };
}
