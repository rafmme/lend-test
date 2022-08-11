import { CustomException } from './custom.exception';

export class RequestValidationException extends CustomException {
  statusCode = 400;

  constructor( public errors: any[]) {
    super('Validation Error');
    Object.setPrototypeOf(this, RequestValidationException.prototype);  
  };

  serializeErrors() {
    return this.errors.map(err => ({
      message: err.message,
      field: err.context.label,
    }));
  };
};


