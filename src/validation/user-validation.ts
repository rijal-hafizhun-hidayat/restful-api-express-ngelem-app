import { string, z, type ZodType } from "zod";

export class UserValidation {
  static readonly UserRequest: ZodType = z.object({
    name: string().min(1).max(100),
    email: string().email().min(1).max(100),
    password: string().min(1).max(100),
  });

  static readonly UpdateUserRequest: ZodType = z.object({
    name: string().min(1).max(100),
    email: string().email().min(1).max(100),
  });
}
