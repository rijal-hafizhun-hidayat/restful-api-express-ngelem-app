import type { role, user } from "@prisma/client";

export class AuthUtils {
  static async compareRole(userRole: role, role: string): Promise<Boolean> {
    if (userRole.name === role) {
      return true;
    } else {
      return false;
    }
  }
}
