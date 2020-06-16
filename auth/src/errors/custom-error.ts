export abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);

    // required because we're extending a built-in class - Error
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract statusCode: number;
  abstract serializeErrors(): {
    message: String;
    field?: String;
  }[];
}
