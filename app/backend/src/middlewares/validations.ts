import { NextFunction, Request, Response } from 'express';
import AppErrors from '../utils/AppErrors';
import { loginSchema, tokenSchema } from '../utils/schemas';
import ILogin from '../interfaces/ILogin';
import JWT from '../utils/JWT';

export function validateLogin(req: Request, _res: Response, next: NextFunction): void {
  const login: ILogin = req.body;
  const { error } = loginSchema.validate(login);

  if (error) throw new AppErrors(400, error.message);

  next();
}

export function validateToken(req: Request, _res: Response, next: NextFunction): void {
  const { authorization } = req.headers;

  if (!authorization) throw new AppErrors(401, 'Token must be a valid token');

  const jwt = new JWT();
  const payload = jwt.validateToken(authorization);

  const { error } = tokenSchema.validate(payload);

  if (error) throw new AppErrors(401, 'Token must be a valid token');

  next();
}
