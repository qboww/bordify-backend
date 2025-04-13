import HttpError from '../../helpers/HttpError';

describe('HttpError helper', () => {
  it('створює помилку з заданим статусом і повідомленням', () => {
    const error = new HttpError(404, 'Not Found');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
    expect(error).toBeInstanceOf(Error);
  });
});
