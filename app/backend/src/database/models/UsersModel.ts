import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    type: STRING(255),
  },
  role: {
    type: STRING(100),
  },
  email: {
    allowNull: false,
    unique: true,
    type: STRING(255),
  },
  password: {
    allowNull: false,
    type: STRING(255),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
