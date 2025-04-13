import existingColumnIdValidator from '../../helpers/existingColumnIdValidator';
import { Types } from 'mongoose';
import Joi from 'joi';

// мокнемо модель Column
jest.mock('../../db/models/Column', () => ({
  __esModule: true,
  default: { exists: jest.fn() },
}));
import Column from '../../db/models/Column';

describe('existingColumnIdValidator helper', () => {
  const mockHelpers = {
    message: jest.fn(({ custom }) => new Error(custom)),
  } as unknown as Joi.CustomHelpers;

  it('повертає _id якщо колонка існує', async () => {
    const validId = new Types.ObjectId();
    (Column.exists as jest.Mock).mockResolvedValueOnce(true);

    const result = await existingColumnIdValidator(validId, mockHelpers);
    expect(result).toBe(validId);
  });

  it('повертає помилку якщо колонки не існує', async () => {
    const fakeId = new Types.ObjectId();
    (Column.exists as jest.Mock).mockResolvedValueOnce(false);

    const result = await existingColumnIdValidator(fakeId, mockHelpers);
    expect(result).toBeInstanceOf(Error);
    expect(mockHelpers.message).toHaveBeenCalledWith({
      custom: `Column with id:${fakeId} does not exist`,
    });
  });
});
