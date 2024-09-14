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
  token: number;
  expired_at: Date;
};

export type RegisterRequest = {
  name: string;
  email: string;
  username: string;
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
  passwordReset: password_reset
): ResetPasswordResponse {
  return {
    token: passwordReset.token,
    expired_at: passwordReset.expired_at,
  };
}
