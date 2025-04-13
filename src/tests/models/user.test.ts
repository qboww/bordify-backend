import { connect, disconnect } from 'mongoose';
import User from '../../db/models/User'; // Шлях до моделі User
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
  // Очищаємо колекцію User перед кожним тестом
  await User.deleteMany({});
});

describe('User Model', () => {
  it('should create and save a user', async () => {
    const userData = {
      username: 'testUser',
      email: 'testuser' + Date.now() + '@example.com',  // Додаємо timestamp для унікальності
      password: 'testPassword',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    // Перевірка, чи користувач був збережений
    expect(savedUser).toHaveProperty('_id');
    expect(savedUser.username).toBe('testUser');
    expect(savedUser.email).toBe(userData.email);
  });

  it('should not create a user without a username', async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'testPassword',
    };

    const user = new User(userData);

    // Перевірка, що викинута помилка через відсутність username
    await expect(user.save()).rejects.toThrowError('Username must exists');
  });

  it('should find a user by ID', async () => {
    const userData = {
      username: 'testUser',
      email: 'testuser' + Date.now() + '@example.com',
      password: 'testPassword',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    const foundUser = await User.findById(savedUser._id);

    expect(foundUser).not.toBeNull();
    expect(foundUser?.username).toBe('testUser');
  });

  it('should update a user', async () => {
    const userData = {
      username: 'testUser',
      email: 'testuser' + Date.now() + '@example.com',
      password: 'testPassword',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    const updatedUser = await User.findByIdAndUpdate(
      savedUser._id,
      { username: 'updatedUser' },
      { new: true }
    );

    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.username).toBe('updatedUser');
  });

  it('should delete a user', async () => {
    const userData = {
      username: 'testUser',
      email: 'testuser' + Date.now() + '@example.com',
      password: 'testPassword',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    await User.findByIdAndDelete(savedUser._id);

    const deletedUser = await User.findById(savedUser._id);
    expect(deletedUser).toBeNull();
  });
});
