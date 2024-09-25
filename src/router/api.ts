import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { UserController } from "../controller/user-controller";
import { ProfileController } from "../controller/profile-controller";
import { uploadProfile } from "../upload/profile";

const apiRoute = express();

apiRoute.get("/api/role", authMiddleware, RoleController.getAll);
apiRoute.post("/api/role", authMiddleware, RoleController.store);
apiRoute.get("/api/role/:roleId", authMiddleware, RoleController.findByRoleId);
apiRoute.put(
  "/api/role/:roleId",
  authMiddleware,
  RoleController.updateByRoleId
);
apiRoute.delete(
  "/api/role/:roleId",
  authMiddleware,
  RoleController.destroyByRoleId
);

apiRoute.get("/api/user", authMiddleware, UserController.getAll);
apiRoute.post("/api/user", authMiddleware, UserController.store);
apiRoute.get("/api/user/:userId", authMiddleware, UserController.findByUserId);
apiRoute.put(
  "/api/user/:userId",
  authMiddleware,
  UserController.updateByUserId
);
apiRoute.delete(
  "/api/user/:userId",
  authMiddleware,
  UserController.destroyByUserId
);
apiRoute.patch(
  "/api/user/:userId/password",
  authMiddleware,
  UserController.updatePasswordByUserId
);

apiRoute.get("/api/profile", authMiddleware, ProfileController.getProfile);
apiRoute.patch(
  "/api/profile/name",
  authMiddleware,
  ProfileController.updateProfileName
);
apiRoute.patch(
  "/api/profile/password",
  authMiddleware,
  ProfileController.updateProfilePassword
);
apiRoute.post(
  "/api/profile/send-otp-email",
  authMiddleware,
  ProfileController.sendOtpChangeEmail
);
apiRoute.patch(
  "/api/profile/update-email",
  authMiddleware,
  ProfileController.updateEmailByOtp
);
apiRoute.patch(
  "/api/profile/update-image",
  authMiddleware,
  uploadProfile.single("file"),
  ProfileController.updateProfileImage
);

export { apiRoute };
