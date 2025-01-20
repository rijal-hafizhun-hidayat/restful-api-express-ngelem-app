import type { password_reset, user } from "@prisma/client";
import { string } from "zod";

export type LoginRequest = {
  email: string;
  password: string;
};

export type ResetPasswordRequest = {
  email: string;
};

export type ResetPasswordResponse = {
  token: string;
};

export type UpdatePasswordRequest = {
  token: string;
  otp: number;
  password: string;
};

export type UpdatePasswordResponse = {
  email: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type DataEmail = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export function toLoginResponse(token: string): LoginResponse {
  return {
    token: token,
  };
}

export function toResetPasswordResponse(
  valueToken: string
): ResetPasswordResponse {
  return {
    token: valueToken,
  };
}

export function toUpdatePasswordResponse(user: user): UpdatePasswordResponse {
  return {
    email: user.email,
  };
}
