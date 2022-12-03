import { Request, Response } from 'express';
import AppErrors from '../utils/AppErrors';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
) {
  const { _status, message } = err as AppErrors;
  res.status(_status || 500).json({ message });
}
