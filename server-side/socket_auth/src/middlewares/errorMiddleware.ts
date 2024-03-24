import {ApiError} from "../models/interfaces";
import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(error: ApiError, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred';
    return res.status(status).json({
        status: 'error',
        statusCode: status,
        message: message,
        data: error.data,
    });
}