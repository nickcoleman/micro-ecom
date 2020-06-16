import {ValidationError} from 'express-validator';
import {CustomError} from './custom-error';

/**
 * Example if implementing an interface
 */
// interface CustomError {
//   statusCode: Number;
//   serializeErrors(): {
//     message: String;
//     field?: String;
//   }[];
// }

// export class RequestValidationError extends Error implements CustomError {

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('Validation error');

    // Required because we are extending the built-in class Error
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
  }
}
