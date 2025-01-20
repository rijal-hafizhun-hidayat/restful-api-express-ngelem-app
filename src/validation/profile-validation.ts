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

  static readonly UpdateProfileImageRequest: ZodType = z.object({
    originalname: string().min(1),
    mimetype: string().refine(
      (type) => ["image/jpeg", "image/png"].includes(type),
      {
        message: "Unsupported file type",
      }
    ),
    size: number().max(1024 * 1024 * 2),
  });
}
