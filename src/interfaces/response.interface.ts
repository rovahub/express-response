import { Response } from 'express';

export interface IResponse {
  success(statusCode: number, data: object): object;
  failure(statusCode: number, message: string): object;
}

export interface IResponseExpress extends Response {
  ok(data: object): any;
  created(data: object): any;
  noContent(): any;
  badRequest(message: string): any;
  unauthorized(message: string): any;
  forbidden(message: string): any;
  notFound(message: string): any;
  internalServerError(message: string): any;
}
