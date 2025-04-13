import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../../types';


export const authenticate = (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.user = {
      _id: 'mockUserId',
      username: 'test',
      email: 'test@example.com',
      avatarUrl: null,
      theme: 'dark',
      isVerified: true,
    };
    next();
  };
  