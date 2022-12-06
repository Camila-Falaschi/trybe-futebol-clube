import * as dotenv from 'dotenv';
import { decode,
  JwtPayload,
  Secret,
  sign,
  SignOptions,
  verify } from 'jsonwebtoken';
import AppErrors from './AppErrors';

interface Ijwt {
  createToken(payload: JwtPayload): string;
  validateToken(token: string): JwtPayload;
}

export default class JWT implements Ijwt {
  private _secret: Secret;
  private _config: SignOptions;

  constructor() {
    dotenv.config();

    this._secret = process.env.JWT_SECRET || '';
    this._config = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
  }

  createToken(payload: JwtPayload): string {
    return sign({ ...payload }, this._secret, this._config);
  }

  validateToken(token: string): JwtPayload {
    try {
      verify(token, this._secret);
      const payload = decode(token);
      return payload as JwtPayload;
    } catch (_e) {
      throw new AppErrors(401, 'Token must be a valid token');
    }
  }
}
