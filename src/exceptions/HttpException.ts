import { HttpStatusCodes } from '@constants/HttpStatusCodes';
import { HttpStatusCode } from '@interfaces/express';

export abstract class HttpException extends Error {
  public message!: string;
  public statusCode!: HttpStatusCode;
  public readonly name!: string;

  public readonly defaultMessage!: string;
  public readonly defaultStatusCode!: HttpStatusCode;

  protected constructor() {
    super();
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequest extends HttpException {
  public readonly defaultMessage = 'Bad Request';
  public readonly defaultStatusCode = HttpStatusCodes.BAD_REQUEST;

  public constructor(message?: string, statusCode?: HttpStatusCode) {
    super();
    this.message = message || this.defaultMessage;
    this.statusCode = statusCode || this.defaultStatusCode;
  }
}

export class Unauthorized extends HttpException {
  public readonly defaultMessage = 'Unauthorized';
  public readonly defaultStatusCode = HttpStatusCodes.UNAUTHORIZED;

  public constructor(message?: string, statusCode?: HttpStatusCode) {
    super();
    this.message = message || this.defaultMessage;
    this.statusCode = statusCode || this.defaultStatusCode;
  }
}

export class Forbidden extends HttpException {
  public readonly defaultMessage = 'Forbidden';
  public readonly defaultStatusCode = HttpStatusCodes.FORBIDDEN;

  public constructor(message?: string, statusCode?: HttpStatusCode) {
    super();
    this.message = message || this.defaultMessage;
    this.statusCode = statusCode || this.defaultStatusCode;
  }
}

export class NotFound extends HttpException {
  public readonly defaultMessage = 'Not Found';
  public readonly defaultStatusCode = HttpStatusCodes.NOT_FOUND;

  public constructor(message?: string, statusCode?: HttpStatusCode) {
    super();
    this.message = message || this.defaultMessage;
    this.statusCode = statusCode || this.defaultStatusCode;
  }
}

export class TooManyRequests extends HttpException {
  public readonly defaultMessage = 'Slow down, too many requests';
  public readonly defaultStatusCode = HttpStatusCodes.TOO_MANY_REQUESTS;

  public constructor(message?: string, statusCode?: HttpStatusCode) {
    super();
    this.message = message || this.defaultMessage;
    this.statusCode = statusCode || this.defaultStatusCode;
  }
}
