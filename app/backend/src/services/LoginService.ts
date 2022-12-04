import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../database/models/UsersModel';
import JWT from '../utils/JWT';
import AppErrors from '../utils/AppErrors';

export default class LoginService {
  constructor(
    private userModel: ModelStatic<User> = User,
    private jwt = new JWT(),
  ) {}

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
      throw new AppErrors(401, 'Incorrect email or password');
    }

    const { password: omitted, ...rest } = user.dataValues;

    const token = this.jwt.createToken(rest);

    return token;
  }

  public validate(token: string): string {
    const payload = this.jwt.validateToken(token);

    const { role } = payload;

    return role;
  }
}
