import { Response } from "express";
export interface IResponse {
    success(statusCode: number, data: object): object;
    failure(statusCode: number, message: string): object;
}
export interface IResponseExpress extends Response {
    ok(data: object, status?: number): any;
    created(data: object, status?: number): any;
    noContent(status?: number): any;
    badRequest(message: string, status?: number): any;
    unauthorized(message: string, status?: number): any;
    forbidden(message: string, status?: number): any;
    notFound(message: string, status?: number): any;
    internalServerError(message: string, status?: number): any;
}
