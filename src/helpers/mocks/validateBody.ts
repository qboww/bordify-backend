import { Request, Response, NextFunction } from 'express';

const validateBody = () => (_req: Request, _res: Response, next: NextFunction) => {
  next();
};

export default validateBody;
