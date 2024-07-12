import { CustomError } from './interface/customError.Interface';

export class AuthorizationError extends Error implements CustomError {
  status: number;
  constructor(message: string, status = 403) {
    super(message);
    this.name = 'AuthorizationError';
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
