import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.loginService.login(email, password);
    return res.status(200).json({ token });
  }

  public validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    const result = this.loginService.validate(authorization as string);
    return res.status(200).json({ role: result });
  }
}
