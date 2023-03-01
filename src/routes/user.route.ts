import { Router } from "express";
import { validation } from "../validation/validation";
import tryCatch from "../middleware/tryCatch";
import userController from "../controllers/user.controllers";
import authMW from "../middleware/authMW";
import { changeBossSchema } from "../validation/validationRoleSchemas";

const userRouter: Router = Router();

userRouter.get(
  "/",
  authMW,
  tryCatch(userController.getAllSubordinates.bind(userController))
);

userRouter.put(
  "/",
  authMW,
  validation(changeBossSchema),
  tryCatch(userController.changeBoss.bind(userController))
);

export default userRouter;
