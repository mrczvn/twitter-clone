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

  static associate(models) {
    this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    this.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
  }
}

export default User;
