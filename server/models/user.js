const DataTypes = require('sequelize')
const { Model } = DataTypes

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: true,
          unique: true,
        },
        profileimagesrc: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        format: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    )
  }
  static associate(db) {
    db.User.hasMany(db.Review)
    db.User.hasMany(db.Comment)
    db.User.belongsToMany(db.Snack, { through: 'Favorite', as: 'Favorited' })
    db.User.belongsToMany(db.Review, { through: 'Like', as: 'Liked' })
  }
}
