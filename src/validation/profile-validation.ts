import { string, z, type ZodType } from "zod";

export class ProfileValidation {
  static readonly UpdateProfileNameRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
