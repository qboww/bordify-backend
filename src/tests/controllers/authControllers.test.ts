import request from 'supertest';
import app from '../../tests/testApp';
import * as authServices from '../../services/authServices';
import { sendMail } from '../../helpers/sendEmail';
import bcrypt from 'bcrypt';

jest.mock('../../services/authServices');
jest.mock('../../helpers/sendEmail');
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashed_password'),
  compare: jest.fn(() => true),
}));

describe('Auth Controller', () => {
  describe('registerUser', () => {
    it('створює нового користувача і надсилає email', async () => {
      const newUser = { username: 'test', email: 'test@example.com' };
      (authServices.findUser as jest.Mock).mockResolvedValue(null);
      (authServices.registerUser as jest.Mock).mockResolvedValue(newUser);

      const response = await request(app).post('/api/auth/register').send({
        username: 'test',
        email: 'test@example.com',
        password: '12345678',
      });

      expect(response.statusCode).toBe(201);
      expect(sendMail).toHaveBeenCalled();
    });

    it('повертає 409, якщо email вже зайнятий', async () => {
      (authServices.findUser as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

      const response = await request(app).post('/api/auth/register').send({
        username: 'test',
        email: 'test@example.com',
        password: '12345678',
      });

      expect(response.statusCode).toBe(409);
    });
  });

  describe('loginUser', () => {
    it('логінить користувача', async () => {
      const user = {
        _id: 'userId',
        username: 'test',
        email: 'test@example.com',
        password: 'hashed_password',
        isVerified: true,
        avatarUrl: null,
        theme: 'dark',
      };

      (authServices.findUser as jest.Mock).mockResolvedValue(user);
      (authServices.abortUserSession as jest.Mock).mockResolvedValue(null);
      (authServices.createSession as jest.Mock).mockResolvedValue({ _id: 'sid', accessToken: 'a', refreshToken: 'r' });

      const response = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: '12345678',
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('повертає 400 при неправильному email', async () => {
      (authServices.findUser as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post('/api/auth/login').send({
        email: 'wrong@example.com',
        password: '12345678',
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
