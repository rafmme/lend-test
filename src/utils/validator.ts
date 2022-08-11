import { ObjectSchema } from '@hapi/joi';
import { RequestValidationException } from '../exceptions';


export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync (payload, { abortEarly: false });
  }
  catch (error: any) {
    throw new RequestValidationException (error.details);
  };
};




