import jwt, { SignOptions } from 'jsonwebtoken';
import { ENV } from '../constant/common';

export const signJwt = (
  payload: Object,
  key: ENV.ACCESS_TOKEN_PRIVATE_KEY,
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(key, 'base64').toString(
    'ascii'
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  key: ENV.ACCESS_TOKEN_PUBLIC_KEY
): T | null => {
  try {
    const publicKey = Buffer.from(key, 'base64').toString(
      'ascii'
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
