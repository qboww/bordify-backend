import { authenticate } from '../../middlewares/authenticate';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../services/authServices', () => ({
  findSession: jest.fn(() => Promise.resolve({})),
  findUser: jest.fn(() => Promise.resolve({
    _id: 'userId',
    email: 'test@test.com',
    username: 'test',
    avatarUrl: null,
    theme: 'dark',
    isVerified: true,
  })),
}));

describe('authenticate middleware', () => {
  const req = {
    headers: { authorization: 'Bearer validToken' },
  } as Partial<Request>;
  const res = {} as Response;
  const next = jest.fn();

  it('має викликати next() при валідному токені', async () => {
    await authenticate(req as Request, res, next as NextFunction);
    expect(next).toHaveBeenCalled();
  });
});
