import { Router } from 'express';
import { addNewUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../../controllers/users/users';

export const UsersRouter = Router();

UsersRouter
    .route('/')
    .get(getAllUsers)
    .post(addNewUser)

UsersRouter
    .route('/:id')
    .get(getSingleUser)
    .patch(updateUser)
    .delete(deleteUser)