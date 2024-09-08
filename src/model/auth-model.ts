export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export function toLoginResponse(token: string): LoginResponse {
  return {
    token: token,
  };
}
