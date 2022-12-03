import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

export const dataSchema = Joi.object();
