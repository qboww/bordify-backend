import swaggerOptions from '../../helpers/swagger';

describe('swagger helper', () => {
  it('повертає обʼєкт з налаштуваннями Swagger', () => {
    expect(swaggerOptions).toBeDefined();
    expect(typeof swaggerOptions).toBe('object');
  });
});
