import { Conflict, NotFound } from "http-errors";
import bcrypt from "bcrypt";
import { IUserRegistr } from "../types/user.type";
import User from "../models/User";

export default class AuthService {
  async registerUser(user: IUserRegistr) {
    if (await User.findOne({ email: user.email })) {
      throw new Conflict("Email in use");
    }
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      user.role = "admin";
      user.boss = null;
    } else {
      user.boss = admin.id;
    }
    const newUser = await User.create(user);
    if (newUser.role !== "admin") {
      await User.findOneAndUpdate(
        { role: "admin" },
        { $push: { subordinatesId: newUser.id } },
        { new: true }
      );
    }
    if (process.env.JWT_TOKEN_EXPIRATION) {
      await newUser.createToken("token", process.env.JWT_TOKEN_EXPIRATION);
      const { token } = newUser;
      return token;
    }
  }

  async loginUser(user: IUserRegistr) {
    const currentUser = await User.findOne({ email: user.email });
    if (!currentUser) {
      throw new NotFound("User with such email does not exist");
    }
    if (!(await bcrypt.compare(user.password, currentUser.password))) {
      throw new NotFound("Wrong password");
    }
    if (process.env.JWT_TOKEN_EXPIRATION) {
      await currentUser.createToken("token", process.env.JWT_TOKEN_EXPIRATION);
      const { token } = currentUser;
      return token;
    }
  }

  async logoutUser(id: string) {
    await User.findByIdAndUpdate(id, { token: null });
  }
}
