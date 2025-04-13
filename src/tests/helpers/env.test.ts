import path from 'path';
import dotenv from 'dotenv';

// Підтягуємо саме файл .env.example
dotenv.config({ path: path.resolve(__dirname, '../../../.env.example') });

describe('env helper', () => {
  it('має встановлені змінні середовища', () => {
    expect(process.env.JWT_SECRET).toBe('test');
    expect(process.env.DB_HOST || process.env.MONGODB_URL).toBe('test');
  });
});
