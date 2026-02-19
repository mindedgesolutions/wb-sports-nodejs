import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.reduce(
        (acc: Record<string, string>, err: any) => {
          const field = err.path.join('.');
          acc[field] = err.message.replace(/"/g, '');
          return acc;
        },
        {},
      );

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Validation error',
        error: errors,
      });
    }
    next();
  };
}
