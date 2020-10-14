import { NextFunction, Request as IExpressRequest } from 'express';

import { IResponse, IResponseExpress } from '../interfaces/response.interface';

class Response implements IResponse {
  constructor(
    private readonly req: IExpressRequest,
    private readonly res: IResponseExpress,
    private readonly next: NextFunction
  ) {
    res.ok = (data: object, status: number = 200) => {
      return this.success(status, data);
    };
    res.created = (data: object, status: number = 201) => {
      return this.success(status, data);
    };

    res.noContent = (status: number = 204) => {
      return this.success(status, {});
    };

    res.badRequest = (message: string, status: number = 400) => {
      return this.failure(status, message);
    };

    res.unauthorized = (message: string, status: number = 401) => {
      return this.failure(status, message);
    };

    res.forbidden = (message: string, status: number = 403) => {
      return this.failure(status, message);
    };

    res.notFound = (message: string, status: number = 404) => {
      return this.failure(status, message);
    };

    res.internalServerError = (message: string, status: number = 500) => {
      return this.failure(status, message);
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
