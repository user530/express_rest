import { Request, Response } from 'express';
import { getAllUsersData } from '../../services/user/users';
import { CustomError, UserData } from '../../common/types';

export const getAllUsers = (req: Request, res: Response) => {
    const data = getAllUsersData();

    return res.status(200).json(data);
}

export const getSingleUser = (req: Request, res: Response) => {
    const { id } = req.params;

    return res.status(200).json({ id });
}

export const addNewUser = (req: Request, res: Response) => {
    try {
        const { field1, field2 } = req.body;

        if (!field1 || !field2)
            throw new CustomError('Body missing required fields!', 400);

        return res.status(201).json({ field1, field2 })
    } catch (error) {
        const errObj = { message: 'Something went wrong...', status: 500 };
        if (error instanceof CustomError) {
            errObj.message = error.message;
            errObj.status = error.status;
        }

        return res
            .status(errObj.status)
            .json(errObj.message)
    }
}

export const updateUser = (req: Request, res: Response) => {
    try {
        const previousValue: UserData = { field1: 'lorem', field2: 42 };

        const { id } = req.params;
        const { field1, field2 } = req.body as Partial<UserData>;

        if (!id || isNaN(Number(id)) || Number(id) < 0)
            throw new CustomError('Provide correct user identifier!', 404);

        const newValue = { ...previousValue }

        if (field1) newValue.field1 = field1;
        if (field2) newValue.field2 = field2;

        return res
            .status(200)
            .json(newValue)
    } catch (error) {
        const errObj = { message: 'Something went wrong...', status: 500 };
        if (error instanceof CustomError) {
            errObj.message = error.message;
            errObj.status = error.status;
        }

        return res
            .status(errObj.status)
            .json(errObj.message)
    }
}

export const deleteUser = (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id)) || Number(id) < 0)
            throw new CustomError('Provide correct user identifier!', 404);

        return res.status(204).json({ status: 'ok' })
    } catch (error) {
        const errObj = { message: 'Something went wrong...', status: 500 };
        if (error instanceof CustomError) {
            errObj.message = error.message;
            errObj.status = error.status;
        }

        return res
            .status(errObj.status)
            .json(errObj.message)
    }
}