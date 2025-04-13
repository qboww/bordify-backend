import isEmptyBody from '../../middlewares/isEmptyBody';
import { Request, Response } from 'express';
import HttpError from '../../helpers/HttpError';

describe('isEmptyBody middleware', () => {
  it('викликає next(error) при порожньому тілі', () => {
    const req = { body: {} } as Request;
    const res = {} as Response;
    const next = jest.fn();

    isEmptyBody(req, res, next);

    const errorArg = (next as jest.Mock).mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(HttpError);
    expect(errorArg.message).toBe('Body cannot be empty');
  });

  it('викликає next() без аргументів при валідному тілі', () => {
    const req = { body: { name: 'Test' } } as Request;
    const res = {} as Response;
    const next = jest.fn();

    isEmptyBody(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});
