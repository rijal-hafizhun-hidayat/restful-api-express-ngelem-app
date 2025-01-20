import express from "express";
import { AuthController } from "../controller/auth-controller";

const publicApiRoute = express();

publicApiRoute.post("/api/login", AuthController.login);
publicApiRoute.post("/api/register", AuthController.register);
publicApiRoute.post("/api/reset-password", AuthController.resetPasswordByEmail);
publicApiRoute.patch(
  "/api/reset-password/update",
  AuthController.updatePasswordByOtp
);

export { publicApiRoute };
