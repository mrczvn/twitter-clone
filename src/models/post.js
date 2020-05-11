import Sequelize, { Model, DataTypes } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        body: DataTypes.TEXT,
        user_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    this.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
  }
}

export default Post;
