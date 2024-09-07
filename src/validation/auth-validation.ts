import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly LoginRequest: ZodType = z.object({
    email: string().email().min(1).max(100),
    password: string().min(1).max(100),
  });
}
