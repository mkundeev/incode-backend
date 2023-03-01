import * as Joi from "joi";
import { IChangeBoss } from "../types/role.type";

export const changeBossSchema = Joi.object<IChangeBoss>({
  newBossId: Joi.string().required(),
  subordinateId: Joi.string().required(),
}).required();
