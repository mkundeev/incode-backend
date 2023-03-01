import { Application } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use((_req, res) => {
      res.status(404).send("Not found");
    });
  }
}

export default AppRouter;
