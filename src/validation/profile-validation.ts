import { password } from "bun";
import { string, z, type ZodType } from "zod";

export class ProfileValidation {
  static readonly UpdateProfileNameRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });

  static readonly UpdateProfilePasswordRequest: ZodType = z.object({
    newPassword: string().min(1).max(100),
    confirmationPassword: string().min(1).max(100),
  });
}
