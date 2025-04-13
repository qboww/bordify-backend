import { sendMail } from '../../helpers/sendEmail';

describe('sendEmail helper', () => {
  it('існує як функція', () => {
    expect(typeof sendMail).toBe('function');
  });
});
