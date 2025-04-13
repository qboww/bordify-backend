import { Request, Response, NextFunction } from 'express';

export const backgroundConvert = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};
