import { IUser, UserModel } from "../models/User";

export const createUser = async (user: IUser): Promise<IUser> => {
  return UserModel.create(user);
};
