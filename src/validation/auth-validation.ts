import { number, string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly LoginRequest: ZodType = z.object({
    email: string().min(1).max(100).email(),
    password: string().min(1).max(100),
  });

  static readonly RegisterRequest: ZodType = z.object({
    name: string().min(1).max(100),
    email: string().min(1).max(100).email(),
    password: string().min(1).max(100),
  });

  static readonly ResetPasswordRequest: ZodType = z.object({
    email: string().min(1).max(100).email(),
  });

  static readonly UpdatePasswordRequest: ZodType = z.object({
    token: string().min(1),
    otp: number().int(),
    password: string().min(1).max(100),
  });
}
