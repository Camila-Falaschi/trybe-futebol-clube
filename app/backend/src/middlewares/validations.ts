import { NextFunction, Request, Response } from 'express';
import AppErrors from '../utils/AppErrors';
import { loginSchema } from '../utils/schemas';
import ILogin from '../interfaces/ILogin';

export default function validateLogin(req: Request, _res: Response, next: NextFunction): void {
  const login: ILogin = req.body;
  const { error } = loginSchema.validate(login);

  if (error) throw new AppErrors(400, error.message);

  next();
}
