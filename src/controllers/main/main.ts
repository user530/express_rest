import { Request, Response } from 'express';
import { getWelcomeInfo } from '../../services/main/main';

export const getMainInfo = (req: Request, res: Response) => {
    res.status(200).json(getWelcomeInfo());
}