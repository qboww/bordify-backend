import isValidId from '../../middlewares/isValidId';
import { Request, Response, NextFunction } from 'express';

describe('isValidId middleware', () => {
  it('викликає next() при валідному ID', () => {
    const req = { params: { id: '60d0fe4f5311236168a109ca' } } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    isValidId(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('викликає next(error) при невалідному ID', () => {
    const req = { params: { id: 'invalid' } } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    isValidId(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
