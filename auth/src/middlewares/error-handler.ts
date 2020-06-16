import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/custom-error';

/**
 * @param err
 * @param req
 * @param res
 * @param next
 * returns a Common response structure
 * @returns { errors: [{ message: string, field?: string }] }
 */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }

  res.status(400).send({
    error: [
      {
        message:
          err.message ||
          'Something went terribly wrong and our geeks are looking into it',
      },
    ],
  });
};
