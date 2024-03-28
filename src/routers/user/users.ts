import { Router } from 'express';
import { getAllUsers } from '../../controllers/users/users';

export const UsersRouter = Router();

UsersRouter
    .route('/')
    .get(getAllUsers)