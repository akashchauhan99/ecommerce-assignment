import { ENV } from '../constant/common';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schema/user';
import {
  createUser, findUser, findUserById, signToken, updateUser
} from '../services/user';
import AppError from '../utils/appError';
import { signJwt, verifyJwt } from '../utils/jwt';

// Exclude this fields from the response
export const excludedFields = ['password'];

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + ENV.ACCESS_TOKEN_EXPIRES_IN
  ),
  maxAge: ENV.ACCESS_TOKEN_EXPIRES_IN,
  httpOnly: true,
  sameSite: 'lax',
};

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = req.body;
    const createUserObj = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };
    const user = await createUser(createUserObj);

    return res.status(201).json({ status: 'success', data: { user } });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ status: 'fail', message: 'Email already exist', });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const { email, password } = req.body;
    const user = await findUser({ email });

    // Check if user exist and password is correct
    if (!user || !(await user.comparePasswords(user.password, password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Create the Access and refresh Tokens
    const { access_token } = await signToken(user);

    await updateUser({ _id: user._id }, { token: access_token });
    return res.status(200).json({ status: 'success', data: { access_token } });
  } catch (err: any) {
    next(err);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    await updateUser({ _id: user._id }, { token: '' });
    return res.status(200).json({ status: 'success', data: {} });
  } catch (err: any) {
    next(err);
  }
};
