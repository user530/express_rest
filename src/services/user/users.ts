import { UserModel } from '../../models/User';

export const getAllUsersData = async () => {
    const users = await UserModel.find({});

    return users;
}