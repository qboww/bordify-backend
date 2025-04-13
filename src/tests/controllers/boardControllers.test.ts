import request from 'supertest';
import app from '../../tests/testApp';
import * as boardServices from '../../services/boardServices';


jest.mock('../../middlewares/authenticate', () => {
  return {
    authenticate: (
      req: import('../../types').RequestWithUser,
      _res: import('express').Response,
      next: import('express').NextFunction
    ) => {
      req.user = {
        _id: 'mockUserId',
        username: 'test',
        email: 'test@example.com',
        avatarUrl: null,
        theme: 'dark',
        isVerified: true,
      };
      next();
    }
  };
});


jest.mock('../../services/boardServices');


jest.mock('../../helpers/validateBody', () => {
  return () =>
    (
      _req: import("express").Request,
      _res: import("express").Response,
      next: import("express").NextFunction
    ) =>
      next();
});

jest.mock('../../middlewares/backgroundConvert', () => {
  return {
    backgroundConvert: (
      _req: import("express").Request,
      _res: import("express").Response,
      next: import("express").NextFunction
    ) => next(),
  };
});



describe('Board Controller', () => {
  describe('GET /api/boards', () => {
    it('повертає список бордів для користувача', async () => {
      const boards = [
        {
          _id: '1',
          title: 'Board 1',
          icon: '🔥',
          backgroundImg: { preview: 'preview1' },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      (boardServices.getBoardsService as jest.Mock).mockResolvedValue(boards);

      const response = await request(app)
        .get('/api/boards');

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Board 1');
    });
  });

  describe('POST /api/boards', () => {
    it('створює новий борд', async () => {
      const board = {
        _id: '1',
        title: 'New Board',
        icon: '📘',
        backgroundImg: { preview: 'preview' },
        columns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (boardServices.createBoardService as jest.Mock).mockResolvedValue(board);

      const response = await request(app)
        .post('/api/boards')
        .send({ title: 'New Board', icon: '📘', backgroundImg: 'image_1' });

      expect(response.statusCode).toBe(201);
      expect(response.body.data.title).toBe('New Board');
    });
  });

  describe('PATCH /api/boards/:boardId', () => {
    it('оновлює борд', async () => {
      const updated = {
        _id: '1',
        title: 'Updated Board',
        icon: '🔥',
        backgroundImg: null,
        columns: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      (boardServices.updateBoardService as jest.Mock).mockResolvedValue(updated);

      const response = await request(app)
        .patch('/api/boards/1')
        .send({ title: 'Updated Board' });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.title).toBe('Updated Board');
    });
  });

  describe('DELETE /api/boards/:boardId', () => {
    it('видаляє борд', async () => {
      (boardServices.deleteBoardService as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .delete('/api/boards/1');

      expect(response.statusCode).toBe(204);
    });
  });
});