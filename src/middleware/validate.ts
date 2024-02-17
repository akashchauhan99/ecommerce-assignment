import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject, value: string = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      req.params = value === 'params' ? validated[value]: {};
      req.body = value === 'body' ? validated[value]: {};
      req.query = value === 'query' ? validated[value]: {};
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          error: err.errors,
        });
      }
      next(err);
    }
  };
