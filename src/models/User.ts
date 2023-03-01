import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserSchema } from "../types/user.type";
import dotenv from "dotenv";

const userSchema = new Schema<IUserSchema>({
  email: { type: String, required: true, uniqu: true },
  password: { type: String, required: true },
  token: { type: String || null, default: null },
  role: { type: String, default: "user" },
  boss: { type: String || null, default: "admin" },
  subordinatesId: { type: [String] },
});

userSchema.pre("save", async function pre() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
dotenv.config();
const secret = process.env.JWT_SECRET;

userSchema.methods.createToken = async function createToken(
  type: string,
  expiration: string
) {
  if (secret) {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      secret,
      {
        expiresIn: expiration,
      }
    );
    this[type] = token;
    await this.save();
  }
};

const User = model<IUserSchema>("User", userSchema);

export default User;
