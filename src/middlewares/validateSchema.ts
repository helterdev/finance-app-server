import { Response, Request, NextFunction } from 'express';
import { Schema, ZodError } from 'zod';

export const validateSchema =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const err = error.issues.map((issue) => issue.message);
        res.status(400).json({ message: err });
      }
    }
  };
