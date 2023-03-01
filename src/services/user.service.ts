import { Conflict, NotFound, Unauthorized } from "http-errors";
import User from "../models/User";
import allSubordinates from "../utils/allSubordinates";
import { IChangeBoss } from "../types/role.type";

export default class UserService {
  async getAllSubordinates(id: string, role: string) {
    switch (role) {
      case "admin":
        return await User.find({}).select("id role boss subordinatesId");
      case "boss":
        return await allSubordinates.findAll(id);
      default:
        throw new NotFound("Roll not found");
    }
  }
  async changeBoss({ newBossId, subordinateId }: IChangeBoss, userId: string) {
    const newBoss = await User.findById(newBossId);
    if (!newBoss) {
      throw new NotFound("Wrong new boss Id");
    }
    const subordinate = await User.findById(subordinateId);
    if (!subordinate) {
      throw new NotFound("Wrong subordinate Id");
    }
    const allSubordinatesArray = await allSubordinates.arrayOfIds(userId);
    if (
      !allSubordinatesArray.includes(newBossId) &&
      !allSubordinatesArray.includes(subordinateId)
    ) {
      throw new Unauthorized("You dont have rights to change user's boss");
    }
    const newBossSubordinates = newBoss.subordinatesId;
    if (newBossSubordinates.includes(subordinateId)) {
      throw new Conflict(
        "Curent boss is already in charge of this suborninate"
      );
    }
    // add new subordinate to subordinates array of new boss
    await User.findByIdAndUpdate(newBossId, {
      $push: { subordinatesId: subordinateId },
      role: "boss",
    });
    // delete subordinate from subordinates array of previos boss
    const previousBossId = subordinate.boss;
    const previousBoss = await User.findByIdAndUpdate(
      previousBossId,
      {
        $pull: { subordinatesId: subordinateId },
      },
      {
        new: true,
      }
    );
    // check if old boss has any subordinates
    if (previousBoss?.subordinatesId.length === 0) {
      await User.findByIdAndUpdate(previousBossId, {
        role: "user",
      });
    }
    // appoint new boss to subordinate
    await User.findByIdAndUpdate(subordinateId, {
      boss: newBossId,
    });
    return { message: "Boss for subordinate was changed" };
  }
}
