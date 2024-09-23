import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { UserController } from "../controller/user-controller";
import { ProfileController } from "../controller/profile-controller";
import { upload } from "../app/upload";

const apiRoute = express.Router();

apiRoute.use(authMiddleware);

apiRoute.get("/api/role", RoleController.getAll);
apiRoute.post("/api/role", RoleController.store);
apiRoute.get("/api/role/:roleId", RoleController.findByRoleId);
apiRoute.put("/api/role/:roleId", RoleController.updateByRoleId);
apiRoute.delete("/api/role/:roleId", RoleController.destroyByRoleId);

apiRoute.get("/api/user", UserController.getAll);
apiRoute.post("/api/user", UserController.store);
apiRoute.get("/api/user/:userId", UserController.findByUserId);
apiRoute.put("/api/user/:userId", UserController.updateByUserId);
apiRoute.delete("/api/user/:userId", UserController.destroyByUserId);
apiRoute.patch(
  "/api/user/:userId/password",
  UserController.updatePasswordByUserId
);

apiRoute.get("/api/profile", ProfileController.getProfile);
apiRoute.patch("/api/profile/name", ProfileController.updateProfileName);
apiRoute.patch(
  "/api/profile/password",
  ProfileController.updateProfilePassword
);
apiRoute.post(
  "/api/profile/send-otp-email",
  ProfileController.sendOtpChangeEmail
);
apiRoute.patch("/api/profile/update-email", ProfileController.updateEmailByOtp);
apiRoute.patch(
  "/api/profile/update-image",
  upload.single("file"),
  ProfileController.updateProfileImage
);

export { apiRoute };
