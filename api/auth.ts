import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { AuthRequest } from './types/context.types';

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies['auth._token.local'].split(' ')[1];

    const payload = jwt.verify(token, 'dummy') as any;

    if (!token) {
      return res.status(401).json({
        message: 'Sorry, you are not authorized to access this resource.'
      });
    }

    req.user = payload;

    return next();
  } catch (error) {
    res.status(401).json({
      message: 'Sorry, you are not authorized to access this resource.'
    });
  }
};
