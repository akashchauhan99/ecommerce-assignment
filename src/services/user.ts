import { FilterQuery, QueryOptions } from 'mongoose';
import { ENV } from '../constant/common';
import userModel, { User } from '../models/user';
import { signJwt } from '../utils/jwt';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return user;
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return user;
};

export const updateUser = async (query: FilterQuery<User>, input: Partial<User>) => {
  const user = await userModel.updateOne(query, { $set: input }).lean();
  return user;
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find().lean();
};

// Find one user by any fields
export const findUser = async (query: FilterQuery<User>, options: QueryOptions = {}) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  try {
    // Sign the access token
    const key = ENV.ACCESS_TOKEN_PRIVATE_KEY;
    const expiresIn = {
      expiresIn: `${ENV.ACCESS_TOKEN_EXPIRES_IN}m`,
    };
    const access_token = signJwt({ user_id: user._id }, key, expiresIn);

    // Return access token
    return { access_token };
  } catch (error: any) {
    throw new Error(error);
  }
};
