import { CustomException } from './custom.exception';

export class BadRequestException extends CustomException {
  statusCode = 400;

  constructor(public customMessage: string) {
    super('Bad Request Error');
    Object.setPrototypeOf(this, BadRequestException.prototype);
    this.customMessage = customMessage;
  };
  
  serializeErrors() {
    return [{ message: this.customMessage || 'Invalid Request'}];
  };
};

