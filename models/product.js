'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{ foreignKey: 'categoryId' });
      Product.belongsTo(models.Category,{ foreignKey: 'brandId' });
      Product.hasMany(models.Product,{ foreignKey:'productId'})
      Product.hasMany(models.ProductSpecification,{ foreignKey:'productId'})
      Product.hasMany(models.Comment,{ foreignKey:'productId'})
      Product.hasMany(models.review,{ foreignKey:'productId'})
    }
  };
  Product.init({
    name: DataTypes.STRING,
    rice: DataTypes.DECIMAL,
    imagepath: DataTypes.TEXT,
    thumbnailPath: DataTypes.TEXT,
    availability: DataTypes.BOOLEAN,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};