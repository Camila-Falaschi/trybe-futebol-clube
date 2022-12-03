import * as dotenv from 'dotenv';
import { decode,
  JsonWebTokenError,
  JwtPayload,
  Secret,
  sign,
  SignOptions,
  verify } from 'jsonwebtoken';

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
      // AppErrors(401, 'Expired or invalid token')
      throw new JsonWebTokenError('Expired or invalid token');
    }
  }
}