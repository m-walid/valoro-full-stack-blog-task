import { NextFunction, Request, Response } from "express";
import Exception from "../util/Exception";

export default function exceptionHandlerMiddleware(
  exception: Exception,
  request:Request,
  response: Response,
  next: NextFunction
) {
  const status = exception.status || 500;
  const message = exception.message;
  response.status(status).json({
    status,
    message,
  });
}
