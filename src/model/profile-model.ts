import type { user } from "@prisma/client";

export type ProfileResponse = {
  name: string;
  email: string;
};

export type UpdateProfileNameRequest = {
  name: string;
};

export function toProfileResponse(user: user): ProfileResponse {
  return {
    name: user.name,
    email: user.email,
  };
}

export function toUpdateProfileNameResponse(
  user: user
): UpdateProfileNameRequest {
  return {
    name: user.name,
  };
}
