import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly LoginRequest: ZodType = z.object({
    email: string().email().min(1).max(100),
    password: string().min(1).max(100),
  });

  static readonly RegisterRequest: ZodType = z.object({
    name: string().min(1).max(100),
    username: string().min(1).max(100),
    email: string().email().min(1).max(100),
    password: string().min(1).max(100),
  });

  static readonly ResetPasswordRequest: ZodType = z.object({
    email: string().email().min(1).max(100),
  });
}
