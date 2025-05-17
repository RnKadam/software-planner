import type { Request, Response, NextFunction } from "express";

interface ValidationError {
  errors: { message: string }[];
  stack?: string;
}

export function errorHandler(
  err: ValidationError & { name: string; code?: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: Object.values(err.errors).map(
        (e: { message: string }) => e.message
      ),
    });
  }

  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate resource",
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
}
