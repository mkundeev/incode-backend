import { Request } from "express";
import UserService from "../services/user.service";
import { IChangeBoss } from "../types/role.type";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllSubordinates(req: Request) {
    const { id, role } = req;
    if (role === "user") return "No subordinates";
    return await this.userService.getAllSubordinates(id, role);
  }

  async changeBoss(req: Request<{}, {}, IChangeBoss>) {
    const body = req.body;
    const userId = req.id;
    return await this.userService.changeBoss(body, userId);
  }
}

const userController = new UserController(new UserService());
export default userController;
