import type { role } from "@prisma/client";

export type RoleRequest = {
  name: string;
};

export type RoleResponse = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export function toRoleResponse(role: role): RoleResponse {
  return {
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  };
}
