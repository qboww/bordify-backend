import { v2 as cloudinary } from 'cloudinary';

describe('cloudinary helper', () => {
  it('має метод upload', () => {
    expect(cloudinary.uploader).toBeDefined();
    expect(typeof cloudinary.uploader.upload).toBe('function');
  });
});
