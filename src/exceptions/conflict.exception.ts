import { CustomException } from './custom.exception';

export class ConflictException extends CustomException {
  statusCode = 409;
  customMessage : any;

  constructor(customMessage?: string) {
    super('Conflict');
    Object.setPrototypeOf(this, ConflictException.prototype);
    this.customMessage = customMessage;
  };

  serializeErrors() {
    return [{ message:  this.customMessage || 'Conflict' }];
  };
};


