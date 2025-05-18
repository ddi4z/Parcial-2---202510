export class BusinessLogicException extends Error {
  public readonly type: BusinessError;

  constructor(message: string, type: BusinessError) {
    super(message);
    this.name = 'BusinessLogicException';
    this.type = type;

    // Fix for instanceof checks and stack trace in transpiled code
    Object.setPrototypeOf(this, BusinessLogicException.prototype);
  }
}

export enum BusinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}
