import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

export const tokenSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  username: Joi.string().min(4).required(),
  role: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  iat: Joi.number().integer().min(1000000000).max(8599999999999)
    .required(),
  exp: Joi.number().integer().min(1000000000).max(8599999999999)
    .required(),
});
