import { Request, Response } from 'express';
import { getAllUsersData, createUserEntity } from '../../services/user/users';
import { CustomError, UserData } from '../../common/types';
import { MongooseError } from 'mongoose';

export const getAllUsers = async (req: Request, res: Response) => {
    const data = await getAllUsersData();
    console.log('Get all users fired!');
    return res.status(200).json(data);
}

export const getSingleUser = (req: Request, res: Response) => {
    const { id } = req.params;

    return res.status(200).json({ id });
}

export const addNewUser = async (req: Request, res: Response) => {
    try {
        console.log('Add new user fired!');

        const newUser = await createUserEntity(req.body);
        console.log(newUser)

        return res.status(201).json(newUser)
    } catch (error) {
        const errObj = { message: 'Something went wrong...', status: 500 };

        if (error instanceof Error) errObj.message = error.message;
        if (error instanceof CustomError) errObj.status = error.status;

        return res
            .status(errObj.status)
            .json(errObj.message)
    }
}

export const updateUser = (req: Request, res: Response) => {
    try {
        const previousValue: UserData = {
            firstName: 'John',
            lastName: 'Doe',
            age: 39,
            position: 'Owner',
            email: 'john123@mail.com',
            phone: '0-123-456-7890',
            bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices in lorem vitae gravida. Nunc urna lacus, dapibus in lorem ut, efficitur accumsan massa. Aenean vulputate tortor a pharetra dignissim. Donec non aliquam ex. Praesent hendrerit, nisi et vestibulum consequat, justo nibh molestie lacus, quis porttitor neque erat quis lorem. Aenean sed arcu mollis, ultrices nulla sagittis, congue lorem. Sed at feugiat massa, vel luctus orci. Nunc vitae varius orci, quis bibendum tortor.`,
            photoUrl: 'https://production-tcf.imgix.net/app/uploads/2016/02/01215033/20130114-jeffrey-g.-madrick-2.jpg',
        };

        const { id } = req.params;
        const { position } = req.body as Partial<UserData>;

        if (!id || isNaN(Number(id)) || Number(id) < 0)
            throw new CustomError('Provide correct user identifier!', 404);

        const newValue = { ...previousValue, position }

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