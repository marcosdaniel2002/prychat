import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isDev = process.env.DEBUG === "true";

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.errorCode && { errorCode: err.errorCode }),
      ...(isDev && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    message:
      isDev && err instanceof Error ? err.message : "Internal server error",
    errorCode: "INTERNAL_ERROR",
    ...(isDev && err instanceof Error && { stack: err.stack }),
  });
};
