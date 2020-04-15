
function response(req: any, res: any, next: any) {
    function success(statusCode: number, data: object) {
        data = JSON.parse(JSON.stringify(data));
        return res.status(statusCode).json({
            data,
            status: 'success'
        });
    }
    function failure(statusCode: number, message: string) {
        return res.status(statusCode).json({
            message: message,
            status: 'error'
        });
    }

    res.ok = (data: object) => {
        success(200, data);
    };

    res.created = (data: object) => {
        success(201, data);
    };

    res.noContent = () => {
        success(204, {});
    };

    res.badRequest = (message: string) => {
        failure(400, message);
    };

    res.unauthorized = (message: string) => {
        failure(401, message);
    };

    res.forbidden = (message: string) => {
        failure(403, message);
    };

    res.notFound = (message: string) => {
        failure(404, message);
    };

    res.internalServerError = (message: string) => {
        failure(500, message);
    };

    next();

}

export default response;