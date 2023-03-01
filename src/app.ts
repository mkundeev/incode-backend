import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import passport from "passport";
import AppRouter from "./routes";
import strategy from "./helpers/passport";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const router = new AppRouter(app);

app.use(cors());
app.use(express.json());
router.init();
passport.use(strategy);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: { status: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(err?.status || 500).json({ message: err.message });
  }
);

export default app;
