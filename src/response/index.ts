import { NextFunction, Request as IExpressRequest } from 'express';

import { IResponse, IResponseExpress } from '../interfaces/response.interface';

class Response implements IResponse {
  constructor(
    private readonly req: IExpressRequest,
    private readonly res: IResponseExpress,
    private readonly next: NextFunction
  ) {
    res.ok = (data: object) => {
      return this.success(200, data);
    };
    res.created = (data: object) => {
      return this.success(201, data);
    };

    res.noContent = () => {
      return this.success(204, {});
    };

    res.badRequest = (message: string) => {
      return this.failure(400, message);
    };

    res.unauthorized = (message: string) => {
      return this.failure(401, message);
    };

    res.forbidden = (message: string) => {
      return this.failure(403, message);
    };

    res.notFound = (message: string) => {
      return this.failure(404, message);
    };

    res.internalServerError = (message: string) => {
      return this.failure(500, message);
    };

    next();
  }

  success(statusCode: number, data: object): object {
    data = JSON.parse(JSON.stringify(data));
    return this.res.status(statusCode).json({
      data,
      status: "success",
    });
  }

  failure(statusCode: number, message: string) {
    return this.res.status(statusCode).json({
      message: message,
      status: "error",
    });
  }
}

export function response(
  req: IExpressRequest,
  res: IResponseExpress,
  next: NextFunction
) {
  return new Response(req, res, next);
}
