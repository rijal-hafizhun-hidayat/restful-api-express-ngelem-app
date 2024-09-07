import type { user } from "@prisma/client";

export type UserRequest = {
  name: string;
  email: string;
  password?: string;
};

export type UserPasswordRequest = {
  password: string;
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
};

export function toUserResponse(user: user): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
