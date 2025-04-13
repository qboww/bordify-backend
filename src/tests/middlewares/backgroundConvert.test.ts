import { backgroundConvert } from "../../middlewares/backgroundConvert";
import { Request, Response, NextFunction } from 'express';

describe('backgroundConvert middleware', () => {
  it('залишає значення "null" як рядки', () => {
    const req = {
      body: {
        backgroundImg: {
          preview: "null",
          mobile: "null",
          tablet: "null",
          desktop: "null",
        },
      },
    } as Partial<Request>;
    const res = {} as Response;
    const next = jest.fn();

    backgroundConvert(req as Request, res, next as NextFunction);

    expect(req.body.backgroundImg).toEqual({
      preview: "null",
      mobile: "null",
      tablet: "null",
      desktop: "null",
    });
    expect(next).toHaveBeenCalled();
  });
});
