import { NextFunction, Request as IExpressRequest } from 'express';
import { IResponse, IResponseExpress } from '../interfaces/response.interface';
declare class Response implements IResponse {
    private readonly req;
    private readonly res;
    private readonly next;
    constructor(req: IExpressRequest, res: IResponseExpress, next: NextFunction);
    success(statusCode: number, data: object): object;
    failure(statusCode: number, message: string): IResponseExpress;
}
export declare function response(req: IExpressRequest, res: IResponseExpress, next: NextFunction): Response;
export {};
