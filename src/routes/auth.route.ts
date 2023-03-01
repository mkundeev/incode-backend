import { Router } from "express";
import { validation } from "../validation/validation";
import { userSchema } from "../validation/validationUserSchemas";
import tryCatch from "../middleware/tryCatch";
import authController from "../controllers/auth.controllers";
import authMW from "../middleware/authMW";

const authRouter: Router = Router();

authRouter.post(
  "/register",
  validation(userSchema),
  tryCatch(authController.registerUser.bind(authController))
);

authRouter.post(
  "/login",
  validation(userSchema),
  tryCatch(authController.loginUser.bind(authController))
);

authRouter.post(
  "/logout",
  authMW,
  tryCatch(authController.logoutUser.bind(authController))
);

export default authRouter;
