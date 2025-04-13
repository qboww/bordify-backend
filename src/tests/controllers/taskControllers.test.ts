import request from 'supertest';
import app from '../../tests/testApp';
import { Types } from 'mongoose';
const taskServices = require('../../services/taskServices').default as Record<string, jest.Mock>;

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

jest.mock('../../helpers/validateBody', () => () => (_req: any, _res: any, next: any) => next());
jest.mock('../../middlewares/isEmptyBody', () => (_req: any, _res: any, next: any) => next());
jest.mock('../../middlewares/isValidId', () => (_req: any, _res: any, next: any) => next());
jest.mock("../../services/taskServices", () => ({
  __esModule: true,
  default: {
    checkColumn: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTaskFromColumn: jest.fn(),
    deleteTask: jest.fn(),
    replaceTask: jest.fn(),
  },
}));

describe('Task Controller', () => {
  const boardId = 'board1';
  const columnId = 'col1';
  const taskId = 'task1';

  describe('POST /api/boards/:boardId/columns/:columnId/tasks', () => {
    it('створює нову задачу', async () => {
      taskServices.checkColumn.mockResolvedValue({ _id: columnId });
      taskServices.createTask.mockResolvedValue({
        _id: taskId,
        title: 'New Task',
        description: 'Do something',
        priority: 'low',
        deadline: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .post(`/api/boards/${boardId}/columns/${columnId}/tasks`)
        .send({ title: 'New Task', description: 'Do something', priority: 'low' });

      expect(response.statusCode).toBe(201);
      expect(response.body.data.title).toBe('New Task');
    });
  });

  describe('PATCH /api/boards/:boardId/columns/:columnId/tasks/:taskId', () => {
    it('оновлює задачу', async () => {
      taskServices.checkColumn.mockResolvedValue({ _id: columnId });
      taskServices.updateTask.mockResolvedValue({
        _id: taskId,
        title: 'Updated Task',
        description: 'Updated description',
        priority: 'high',
        deadline: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app)
        .patch(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
        .send({ title: 'Updated Task' });

      expect(response.statusCode).toBe(200);
      expect(response.body.data.title).toBe('Updated Task');
    });
  });

  describe("DELETE /api/boards/:boardId/columns/:columnId/tasks/:taskId", () => {
    it("видаляє задачу", async () => {
      const validTaskId = "507f1f77bcf86cd799439011";

      const mockObjectId = new Types.ObjectId(validTaskId);
      jest.spyOn(Types, "ObjectId").mockImplementation(() => mockObjectId);

      taskServices.deleteTaskFromColumn.mockResolvedValue({ modifiedCount: 1 });
      taskServices.deleteTask.mockResolvedValue({ _id: validTaskId });

      const response = await request(app).delete(
        `/api/boards/${boardId}/columns/${columnId}/tasks/${validTaskId}`
      );

      expect(taskServices.deleteTaskFromColumn).toHaveBeenCalledWith(
        { _id: columnId, boardId, userId: "mockUserId" },
        mockObjectId
      );

      expect(taskServices.deleteTask).toHaveBeenCalledWith({
        _id: validTaskId,
        columnId,
        boardId,
        userId: "mockUserId",
      });

      expect(response.statusCode).toBe(204);
    });
  });
});
