import validateBody from '../../helpers/validateBody';

describe('validateBody middleware generator', () => {
  it('повертає функцію', () => {
    const dummySchema = { validate: () => ({ error: null }) };
    const middleware = validateBody(dummySchema as any);
    expect(typeof middleware).toBe('function');
  });
});
