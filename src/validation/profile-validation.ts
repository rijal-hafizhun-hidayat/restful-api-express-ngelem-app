import { number, string, z, type ZodType } from "zod";

export class ProfileValidation {
  static readonly UpdateProfileNameRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });

  static readonly UpdateProfilePasswordRequest: ZodType = z.object({
    newPassword: string().min(1).max(100),
    confirmationPassword: string().min(1).max(100),
  });

  static readonly SendOtpChangeEmailRequest: ZodType = z.object({
    email: string().min(1).max(100).email(),
  });

  static readonly UpdateEmailByOtpRequest: ZodType = z.object({
    otp: number().int(),
    newEmail: string().min(1).max(100).email(),
  });
}
