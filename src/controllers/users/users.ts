import { Request, Response } from 'express';
import { getAllUsersData } from '../../services/user/users';

export const getAllUsers = (req: Request, res: Response) => {
    const data = getAllUsersData();
    return res.status(200).json(data);
}