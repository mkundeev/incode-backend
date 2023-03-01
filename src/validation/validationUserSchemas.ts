import * as Joi from "joi";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../types/user.type";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const userSchema = Joi.object<Omit<IUser, "token">>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).required();

export const validateRefreshTokenSchema = (message: string) =>
  Joi.object({
    refreshToken: Joi.custom((value, helpers) => {
      if (!jwt.verify(value, process.env.JWT_SECRET as Secret)) {
        return helpers.message(message as any);
      }
      return true;
    }),
  });
