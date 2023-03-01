import { Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  token: string | null;
  role: string;
  boss: string;
  subordinatesId: string[];
}

export interface IUserRegistr {
  email: string;
  password: string;
  role?: string;
  boss?: string | null;
}

export interface IUserSchema extends IUser {
  createToken(type: string, expiration: string): void;
}

export interface UserModel extends Document {
  email: string;
  password: string;
  token: string | null;
  role: string;
  boss: string;
  subordinatesId: string[];
}

export interface UserDto extends UserModel {
  _id: string;
}
