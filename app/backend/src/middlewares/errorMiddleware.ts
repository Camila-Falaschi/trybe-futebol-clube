import { NextFunction, Request, Response } from 'express';
import AppErrors from '../utils/AppErrors';

export default function errorMiddleware(
  err: AppErrors,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { _status, message } = err as AppErrors;
  res.status(_status || 500).json({ message });
}
