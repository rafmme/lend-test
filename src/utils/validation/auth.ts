import Joi from '@hapi/joi';


const email = Joi.string().email().min(8).max(254)
  .lowercase().trim().required();

const fullName = Joi.string().min(3).max(128).trim().required();

const securityPassKey = Joi.string()
    .min(8)
    .max(254)
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message(
      '"{#label}" must contain one uppercase letter, one lowecase letter and one digit'
    )
    .required();

const confirmSecurityPassKey = Joi.valid(Joi.ref('securityPassKey')).required();

export const registerSchema = Joi.object ({
  email, fullName, securityPassKey,
  confirmSecurityPassKey,
});


