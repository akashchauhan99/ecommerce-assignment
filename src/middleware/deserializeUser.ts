import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';
import { ENV } from '../constant/common';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let access_token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError('You are not logged in', 401));
    }

    // Validate Access Token
    const decoded: any = verifyJwt<{ sub: string }>(
      access_token,
      ENV.ACCESS_TOKEN_PUBLIC_KEY
    );

    if (!decoded) {
      return next(new AppError(`Invalid token or user doesn't exist`, 401));
    }

    // Check if user still exist
    const user = await findUserById(decoded.user_id);

    if (!user) {
      return next(new AppError(`User with that token no longer exist`, 401));
    }

    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
