import { CustomException } from './custom.exception';

export class NotFoundException extends CustomException {
  statusCode = 404;
  customMessage : any;
  
  constructor(customMessage?: string) {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundException.prototype);
    this.customMessage = customMessage;
  };
  
  serializeErrors() {
    return [{ message: this.customMessage || 'Not Found'}];
  };
};


