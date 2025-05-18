export class BusinessLogicException extends Error {
  constructor(
    public readonly message: string,
    public readonly type: BusinessError,
  ) {
    super(message);
    this.name = 'BusinessLogicException';
    Object.setPrototypeOf(this, BusinessLogicException.prototype);
  }
}

export enum BusinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}
