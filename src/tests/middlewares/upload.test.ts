import upload from '../../middlewares/upload';

describe('upload middleware', () => {
  it('має метод .single()', () => {
    expect(upload).toBeDefined();
    expect(typeof upload.single).toBe('function');
  });
});
