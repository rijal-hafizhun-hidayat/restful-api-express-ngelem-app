import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { UserController } from "../controller/user-controller";
import { ProfileController } from "../controller/profile-controller";
import { uploadProfile } from "../upload/profile";
import { adminMiddleware } from "../middleware/admin-middleware";
import { userMiddleware } from "../middleware/user-middleware";

const apiRoute = express();
apiRoute.use(authMiddleware);

apiRoute.get("/api/role", adminMiddleware, RoleController.getAll);
apiRoute.post("/api/role", adminMiddleware, RoleController.store);
apiRoute.get("/api/role/:roleId", adminMiddleware, RoleController.findByRoleId);
apiRoute.put(
  "/api/role/:roleId",
  adminMiddleware,
  RoleController.updateByRoleId
);
apiRoute.delete(
  "/api/role/:roleId",
  adminMiddleware,
  RoleController.destroyByRoleId
);

apiRoute.get("/api/user", adminMiddleware, UserController.getAll);
apiRoute.post("/api/user", adminMiddleware, UserController.store);
apiRoute.get("/api/user/:userId", adminMiddleware, UserController.findByUserId);
apiRoute.put(
  "/api/user/:userId",
  adminMiddleware,
  UserController.updateByUserId
);
apiRoute.delete(
  "/api/user/:userId",
  adminMiddleware,
  UserController.destroyByUserId
);
apiRoute.patch(
  "/api/user/:userId/password",
  adminMiddleware,
  UserController.updatePasswordByUserId
);

apiRoute.get("/api/profile", userMiddleware, ProfileController.getProfile);
apiRoute.patch(
  "/api/profile/name",
  userMiddleware,
  ProfileController.updateProfileName
);
apiRoute.patch(
  "/api/profile/password",
  userMiddleware,
  ProfileController.updateProfilePassword
);
apiRoute.post(
  "/api/profile/send-otp-email",
  userMiddleware,
  ProfileController.sendOtpChangeEmail
);
apiRoute.patch(
  "/api/profile/update-email",
  userMiddleware,
  ProfileController.updateEmailByOtp
);
apiRoute.patch(
  "/api/profile/update-image",
  userMiddleware,
  uploadProfile.single("file"),
  ProfileController.updateProfileImage
);

export { apiRoute };
