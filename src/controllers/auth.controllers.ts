import { Request } from "express";
import { IUser } from "../types/user.type";
import AuthService from "../services/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async registerUser(req: Request<{}, {}, Omit<IUser, "token">>) {
    const user = req.body;
    const token = await this.authService.registerUser(user);
    return token;
  }

  async loginUser(req: Request<{}, {}, Omit<IUser, "token">>) {
    const user = req.body;
    const token = await this.authService.loginUser(user);
    return token;
  }

  async logoutUser(req: Request) {
    const { id } = req;
    await this.authService.logoutUser(id);
  }
}

const authController = new AuthController(new AuthService());
export default authController;
