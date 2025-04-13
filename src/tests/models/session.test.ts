import { connect, disconnect } from 'mongoose';
import Session from '../../db/models/Session'; // Шлях до моделі Session
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Створюємо віртуальну базу даних для тестів
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Підключаємо Mongoose до in-memory бази даних
  await connect(mongoUri);
});

afterAll(async () => {
  // Відключення від бази даних після завершення тестів
  await disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Очищаємо колекцію Session перед кожним тестом
  await Session.deleteMany({});
});

describe('Session Model', () => {
  it('should create and save a session', async () => {
    const sessionData = {
      userId: 'user1',
      accessToken: 'accessToken123',
      refreshToken: 'refreshToken123',
    };

    const session = new Session(sessionData);
    const savedSession = await session.save();

    expect(savedSession).toHaveProperty('_id');
    expect(savedSession.userId).toBe('user1');
    expect(savedSession.accessToken).toBe('accessToken123');
    expect(savedSession.refreshToken).toBe('refreshToken123');
  });

  it('should not create a session without a userId', async () => {
    const sessionData = {
      accessToken: 'accessToken123',
      refreshToken: 'refreshToken123',
    };

    const session = new Session(sessionData);

    // Перевірка, що викинута помилка через відсутність userId
    await expect(session.save()).rejects.toThrowError('User ID must exists');
  });

  it('should not create a session without an accessToken', async () => {
    const sessionData = {
      userId: 'user1',
      refreshToken: 'refreshToken123',
    };

    const session = new Session(sessionData);

    // Перевірка, що викинута помилка через відсутність accessToken
    await expect(session.save()).rejects.toThrowError('Access Token required');
  });

  it('should find a session by userId', async () => {
    const sessionData = {
      userId: 'user1',
      accessToken: 'accessToken123',
      refreshToken: 'refreshToken123',
    };

    const session = new Session(sessionData);
    const savedSession = await session.save();

    // Знаходимо сесію за userId
    const foundSession = await Session.findOne({ userId: savedSession.userId });

    expect(foundSession).not.toBeNull();
    expect(foundSession!.userId).toBe('user1');
  });

  it('should update a session', async () => {
    const sessionData = {
      userId: 'user1',
      accessToken: 'accessToken123',
      refreshToken: 'refreshToken123',
    };

    const session = new Session(sessionData);
    const savedSession = await session.save();

    const updatedSession = await Session.findByIdAndUpdate(
      savedSession._id,
      { accessToken: 'newAccessToken123' },
      { new: true }
    );

    expect(updatedSession).not.toBeNull();
    expect(updatedSession!.accessToken).toBe('newAccessToken123');
  });

  it('should delete a session', async () => {
    const sessionData = {
      userId: 'user1',
      accessToken: 'accessToken123',
      refreshToken: 'refreshToken123',
    };

    const session = new Session(sessionData);
    const savedSession = await session.save();

    await Session.findByIdAndDelete(savedSession._id);

    const deletedSession = await Session.findById(savedSession._id);
    expect(deletedSession).toBeNull();
  });
});
