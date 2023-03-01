import { Response, Request, NextFunction } from "express";
import { Error } from "mongoose";
import passport from "passport";
import { UserDto } from "../types/user.type";

const authMW = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: UserDto) => {
      if (!user || err) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
          data: "Unauthorized",
        });
      }
      req.id = user._id;
      req.role = user.role;
      next();
    }
  )(req, res, next);
};

export default authMW;
