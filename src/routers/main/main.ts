import { Router } from 'express';
import { getMainInfo } from '../../controllers/main/main';

export const MainRouter = Router();

MainRouter
    .route('/')
    .get(getMainInfo);