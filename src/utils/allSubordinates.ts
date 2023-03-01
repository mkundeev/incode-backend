import User from "../models/User";
import { UserDto } from "../types/user.type";

class AllSubordinates {
  private async recursiveSearch(
    subordinatesIdArray: string[],
    newArray: UserDto[]
  ) {
    for (let i = 0; i < subordinatesIdArray.length; i++) {
      const user = await User.findById<UserDto>(subordinatesIdArray[i]).select(
        "id role boss subordinatesId"
      );
      if (user) newArray.push(user);
      if (user?.subordinatesId && user?.subordinatesId.length !== 0) {
        newArray.concat(
          await this.recursiveSearch(user?.subordinatesId, newArray)
        );
      }
    }
    return newArray;
  }
  async findAll(id: string) {
    const array: UserDto[] = [];
    const user = await User.findById(id);
    const subordinatesId = user?.subordinatesId;
    return subordinatesId
      ? await this.recursiveSearch(subordinatesId, array)
      : [];
  }

  async arrayOfIds(id: string) {
    const array = await this.findAll(id);
    return array.map<string>((item) => item.id);
  }
}

const allSubordinates = new AllSubordinates();
export default allSubordinates;
