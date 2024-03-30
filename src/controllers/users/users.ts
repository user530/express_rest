import { Request, Response } from 'express';
import { getAllUsersData, createUserEntity } from '../../services/user/users';
import { CustomError, UserData } from '../../common/types';

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
        const { field1, field2 } = req.body;
        console.log('Add new user fired!');
        if (!field1 || !field2)
            throw new CustomError('Body missing required fields!', 400);
        console.log('Correct body!')
        const newUser = await createUserEntity();
        console.log(newUser)

        return res.status(201).json(newUser)
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
        const previousValue: UserData = {
            firstName: 'John',
            lastName: 'Doe',
            age: 39,
            position: 'Owner',
            contacts: {
                email: 'john123@mail.com',
                phone: '0-123-456-7890',
            },
            bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices in lorem vitae gravida. Nunc urna lacus, dapibus in lorem ut, efficitur accumsan massa. Aenean vulputate tortor a pharetra dignissim. Donec non aliquam ex. Praesent hendrerit, nisi et vestibulum consequat, justo nibh molestie lacus, quis porttitor neque erat quis lorem. Aenean sed arcu mollis, ultrices nulla sagittis, congue lorem. Sed at feugiat massa, vel luctus orci. Nunc vitae varius orci, quis bibendum tortor.

            Sed aliquam metus sed leo rutrum ullamcorper. Maecenas aliquet venenatis tellus quis dictum. Aliquam id ex sollicitudin, viverra nibh nec, semper neque. Pellentesque tempus purus arcu, a venenatis sem faucibus sed. Nulla accumsan tortor at dui sagittis pulvinar. Vivamus aliquam pellentesque urna. Morbi molestie erat finibus eros interdum interdum. Aenean tempor purus urna, quis placerat mi pharetra a. Suspendisse potenti. Nam et rutrum magna. Vestibulum imperdiet blandit pharetra. Aenean pharetra mauris in magna dapibus sollicitudin tincidunt eget purus. Curabitur dignissim in orci a convallis. Nulla rutrum neque sed risus pretium fringilla. Pellentesque ac urna consequat, tincidunt lectus et, aliquet leo.

            Praesent et felis volutpat, gravida dolor id, eleifend ante. Donec molestie massa ac mi tempus tempus in tristique dolor. Mauris auctor velit dolor, at pharetra ex rutrum et. Nunc sollicitudin urna urna, eget suscipit leo viverra sit amet. Proin porttitor augue nisl, a pulvinar purus placerat vitae. Proin ut faucibus lacus. Praesent pharetra pellentesque ipsum ut mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ultricies ullamcorper pulvinar. Sed et accumsan massa, id vehicula sapien. Pellentesque lacinia purus sit amet velit ultricies lacinia. Proin hendrerit dignissim est, sit amet tristique velit scelerisque rutrum. Phasellus elementum tincidunt diam eget iaculis.

            In eget neque quis risus pulvinar varius. Sed suscipit placerat metus nec facilisis. Vivamus vel nunc aliquam, lacinia purus sit amet, eleifend turpis. Pellentesque tempus elementum turpis sit amet feugiat. Morbi vulputate vitae ante vel facilisis. Aliquam et interdum dolor. Vivamus laoreet dolor tortor, ut eleifend massa accumsan at.

            Pellentesque at justo sit amet eros mattis consequat eget pellentesque magna. Cras semper nunc vitae faucibus placerat. Aliquam dignissim scelerisque facilisis. Donec suscipit commodo arcu vel convallis. Nulla vel rutrum nunc, eget tristique diam. Nulla eget elit vitae erat tincidunt imperdiet. Ut pretium consectetur erat, tempus vestibulum neque bibendum vitae. Suspendisse cursus eros vel dapibus fermentum. Phasellus eget purus ante. In imperdiet justo vel ligula tempus eleifend. Aenean non magna porta, pretium libero vel, viverra sapien. Nullam fermentum finibus rutrum.`,
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