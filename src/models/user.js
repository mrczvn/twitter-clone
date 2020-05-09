import Sequelize, { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      }
    );
    this.addHook('beforeCreate', (user) => {
      return user.set('password', bcrypt.hashSync(user.password, 8));
    });

    return this;
  }
  static isPassword(encodedPassword, password) {
    return bcrypt.compareSync(password, encodedPassword);
  }
}

export default User;
