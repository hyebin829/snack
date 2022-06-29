const DataTypes = require('sequelize')
const { Model } = DataTypes

module.exports = class Snack extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        brand: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        imagesrc: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
      },
      {
        modelName: 'Snack',
        tableName: 'snacks',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    )
  }
  static associate(db) {
    db.Snack.hasMany(db.Review)
    db.Snack.belongsToMany(db.User, { through: 'Favorite', as: 'Favorites' })
  }
}
