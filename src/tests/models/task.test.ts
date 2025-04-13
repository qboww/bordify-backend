import { connect, disconnect } from 'mongoose';
import Task from '../../db/models/Task';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Types } from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await connect(mongoUri);
});

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});

describe('Task Model', () => {
  it('should create and save a task', async () => {
    const taskData = {
      columnId: new Types.ObjectId(),
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      title: 'Test Task',
      description: 'Description for test task',
      priority: 'high',
      deadline: new Date(),
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    expect(savedTask).toHaveProperty('_id');
    expect(savedTask.title).toBe('Test Task');
    expect(savedTask.description).toBe('Description for test task');
    expect(savedTask.priority).toBe('high');
    expect(savedTask.deadline).toBeInstanceOf(Date);
  });

  it('should not create a task without a title', async () => {
    const taskData = {
      columnId: new Types.ObjectId(),
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      description: 'Test task without title',
      priority: 'medium',
      deadline: new Date(),
    };

    const task = new Task(taskData);

    await expect(task.save()).rejects.toThrowError('Title must exists');
  });

  it('should find a task by ID', async () => {
    const taskData = {
      columnId: new Types.ObjectId(),
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      title: 'Test Task',
      description: 'Description for test task',
      priority: 'medium',
      deadline: new Date(),
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    const foundTask = await Task.findById(savedTask._id);
    expect(foundTask).not.toBeNull();
    expect(foundTask!.title).toBe('Test Task');
  });

  it('should update a task', async () => {
    const taskData = {
      columnId: new Types.ObjectId(),
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      title: 'Test Task',
      description: 'Description for test task',
      priority: 'medium',
      deadline: new Date(),
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    const updatedTask = await Task.findByIdAndUpdate(
      savedTask._id,
      { title: 'Updated Task' },
      { new: true }
    );

    expect(updatedTask).not.toBeNull(); 
    expect(updatedTask!.title).toBe("Updated Task"); 
  });

  it('should delete a task', async () => {
    const taskData = {
      columnId: new Types.ObjectId(),
      boardId: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      title: 'Test Task to Delete',
      description: 'Description for test task to delete',
      priority: 'low',
      deadline: new Date(),
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    // Видаляємо задачу
    await Task.findByIdAndDelete(savedTask._id);

    // Перевіряємо, чи задача була видалена
    const deletedTask = await Task.findById(savedTask._id);
    expect(deletedTask).toBeNull();
  });
});
