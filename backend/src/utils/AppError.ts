export class AppError extends Error {
  public readonly errorCode: string | undefined;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400, errorCode?: string) {
    super(message);
    this.name = "AppError";
    this.errorCode = errorCode;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
