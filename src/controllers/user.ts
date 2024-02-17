import { NextFunction, Request, Response } from 'express';
import { updateUser } from '../services/user';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    delete user.token;
    return res.status(200).json({ status: 'success', data: { user } });
  } catch (err: any) {
    next(err);
  }
};

export const editUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const { name } = req.body;
    await updateUser({ _id: user._id }, { name });
    return res.status(200).json({ status: 'success', data: {} });
  } catch (err: any) {
    next(err);
  }
};