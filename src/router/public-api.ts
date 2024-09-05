import express from "express";
import { AuthController } from "../controller/auth-controller";
import { HelloController } from "../controller/hello-controller";
import { RoleController } from "../controller/role-controller";

const publicApiRoute = express.Router();

publicApiRoute.get("/api", HelloController.index);
publicApiRoute.post("/api/login", AuthController.login);

publicApiRoute.get("/api/role", RoleController.getAll);
publicApiRoute.post("/api/role", RoleController.store);
publicApiRoute.get("/api/role/:roleId", RoleController.findByRoleId);
publicApiRoute.put("/api/role/:roleId", RoleController.updateByRoleId);
publicApiRoute.delete("/api/role/:roleId", RoleController.destroyByRoleId);

export { publicApiRoute };
