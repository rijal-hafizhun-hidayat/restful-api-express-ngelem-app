import express from "express";
import { AuthController } from "../controller/auth-controller";
import { HelloController } from "../controller/hello-controller";

const publicApiRoute = express.Router();

publicApiRoute.get("/api", HelloController.index);
publicApiRoute.post("/api/login", AuthController.login);

export { publicApiRoute };
