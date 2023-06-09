import { Request, Response } from 'express';
import { listAnUserService } from '../../services/user/listAnUser.service';

export const listAnUserController = async (req: Request, res: Response) => {

    const users = await listAnUserService(req.user.id)

    return res.status(200).json(users)
}