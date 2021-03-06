'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Previews.belongsTo(models.User,{ foreignKey: 'userId'});
      Previews.belongsTo(models.Product,{ foreignKey: 'productId'});
    }
  };
  Preview.init({
    message: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Preview',
  });
  return Preview;
};