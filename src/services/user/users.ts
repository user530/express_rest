import { UserData } from '../../common/types';
import { UserModel } from '../../models/User';

export const getAllUsersData = async () => {
    const users = await UserModel.find({});

    return users;
}

export const createUserEntity = async (userData: UserData) => {
    return await UserModel.create(userData);
}