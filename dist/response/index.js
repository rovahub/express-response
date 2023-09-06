"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
var Response = /** @class */ (function () {
    function Response(req, res, next) {
        var _this = this;
        this.req = req;
        this.res = res;
        this.next = next;
        res.ok = function (data, status) {
            if (status === void 0) { status = 200; }
            return _this.success(status, data);
        };
        res.created = function (data, status) {
            if (status === void 0) { status = 201; }
            return _this.success(status, data);
        };
        res.noContent = function (status) {
            if (status === void 0) { status = 204; }
            return _this.success(status, {});
        };
        res.badRequest = function (message, status) {
            if (status === void 0) { status = 400; }
            return _this.failure(status, message);
        };
        res.unauthorized = function (message, status) {
            if (status === void 0) { status = 401; }
            return _this.failure(status, message);
        };
        res.forbidden = function (message, status) {
            if (status === void 0) { status = 403; }
            return _this.failure(status, message);
        };
        res.notFound = function (message, status) {
            if (status === void 0) { status = 404; }
            return _this.failure(status, message);
        };
        res.internalServerError = function (message, status) {
            if (status === void 0) { status = 500; }
            return _this.failure(status, message);
        };
        next();
    }
    Response.prototype.success = function (statusCode, data) {
        data = JSON.parse(JSON.stringify(data));
        return this.res.status(statusCode).json({
            data: data,
            status: "success",
        });
    };
    Response.prototype.failure = function (statusCode, message) {
        return this.res.status(statusCode).json({
            message: message,
            status: "error",
        });
    };
    return Response;
}());
function response(req, res, next) {
    return new Response(req, res, next);
}
exports.response = response;
