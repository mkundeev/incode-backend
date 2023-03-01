import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const swaggerDocument = require("../helpers/openapi.json");
class AppRouter {
  constructor(private app: Application) {}
  init() {
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use((_req, res) => {
      res.status(404).send("Not found");
    });
  }
}

export default AppRouter;
