import express from "express";
import { AuthController } from "../controller/auth-controller";
import { HelloController } from "../controller/hello-controller";
import { RoleController } from "../controller/role-controller";
import { UserController } from "../controller/user-controller";

const publicApiRoute = express.Router();

publicApiRoute.get("/api", HelloController.index);
publicApiRoute.post("/api/login", AuthController.login);

publicApiRoute.get("/api/role", RoleController.getAll);
publicApiRoute.post("/api/role", RoleController.store);
publicApiRoute.get("/api/role/:roleId", RoleController.findByRoleId);
publicApiRoute.put("/api/role/:roleId", RoleController.updateByRoleId);
publicApiRoute.delete("/api/role/:roleId", RoleController.destroyByRoleId);

publicApiRoute.get("/api/user", UserController.getAll);
publicApiRoute.post("/api/user", UserController.store);
publicApiRoute.get("/api/user/:userId", UserController.findByUserId);
publicApiRoute.put("/api/user/:userId", UserController.updateByUserId);
publicApiRoute.delete("/api/user/:userId", UserController.destroyByUserId)

export { publicApiRoute };
