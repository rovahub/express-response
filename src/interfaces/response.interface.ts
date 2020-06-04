import { Response } from 'express';

export interface IResponse {
  success(statusCode: number, data: object): object;
  failure(statusCode: number, message: string): object;
}

export interface IResponseExpress extends Response {
  ok(data: object): object;
  created(data: object): object;
  noContent(): object;
  badRequest(message: string): object;
  unauthorized(message: string): object;
  forbidden(message: string): object;
  notFound(message: string): object;
  internalServerError(message: string): object;
}
