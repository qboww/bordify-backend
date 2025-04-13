import request from 'supertest';
import app from '../../tests/testApp';
import generalServicesDefault from '../../services/generalServices';
import columnServicesDefault from '../../services/columnServices';

const columnServices = columnServicesDefault as any;
const generalServices = generalServicesDefault as any;

jest.mock('../../middlewares/authenticate', () => ({
  authenticate: (
    req: import('express').Request,
    _res: import('express').Response,
    next: import('express').NextFunction
  ) => {
    (req as any).user = {
      _id: 'mockUserId',
      username: 'test',
      email: 'test@example.com',
      avatarUrl: null,
      theme: 'dark',
      isVerified: true,
    };
    next();
  },
}));

jest.mock('../../services/columnServices');
jest.mock('../../services/generalServices');

jest.mock('../../helpers/validateBody', () => () =>
  (_req: any, _res: any, next: any) => next()
);
jest.mock('../../middlewares/backgroundConvert', () => ({
  backgroundConvert: (_req: any, _res: any, next: any) => next(),
}));
jest.mock('../../middlewares/isEmptyBody', () => (
  _req: any,
  _res: any,
  next: any
) => next());
jest.mock('../../middlewares/isValidId', () => (
  _req: any,
  _res: any,
  next: any
) => next());

describe('Column Controller', () => {
  const boardId = 'board1';
  const columnId = '1';

  describe('POST /api/boards/:boardId/columns', () => {
    it('створює нову колонку', async () => {
      columnServices.checkBoard.mockResolvedValue({ _id: boardId });
      columnServices.createColumn.mockResolvedValue({
        _id: columnId,
        title: 'New column',
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .post(`/api/boards/${boardId}/columns`)
        .send({ title: 'New column', boardId });

      expect(response.statusCode).toBe(201);
      expect(response.body.data.title).toBe('New column');
    });
  });

  describe('PATCH /api/boards/:boardId/columns/:columnId', () => {
    it('оновлює колонку', async () => {
      columnServices.updateColumn.mockResolvedValue({
        _id: columnId,
        title: 'Updated Column',
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .patch(`/api/boards/${boardId}/columns/${columnId}`)
        .send({ title: 'Updated Column' });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.title).toBe('Updated Column');
    });
  });

  describe('DELETE /api/boards/:boardId/columns/:columnId', () => {
    it('видаляє колонку', async () => {
      const validColumnId = '507f1f77bcf86cd799439011';

      columnServices.deleteColumnFromBoard.mockResolvedValue({ _id: boardId });
      columnServices.deleteColumn.mockResolvedValue({ _id: validColumnId });
      generalServices.deleteTasks.mockResolvedValue(undefined);

      const response = await request(app).delete(
        `/api/boards/${boardId}/columns/${validColumnId}`
      );

      expect(response.statusCode).toBe(204);
    });
  });

});
