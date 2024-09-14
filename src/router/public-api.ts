import express from "express";
import { AuthController } from "../controller/auth-controller";

const publicApiRoute = express.Router();

publicApiRoute.post("/api/login", AuthController.login);
publicApiRoute.post("/api/register", AuthController.register);
publicApiRoute.post("/api/reset-password", AuthController.resetPasswordByEmail);

export { publicApiRoute };
