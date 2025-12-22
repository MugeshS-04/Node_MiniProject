'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsToMany(models.orders, { 
        through: models.order_product,
        foreignKey: "product_id"
      })
    }

    static async totalAmount(order)
    {
      let totalAmount = 0

      const product_id = order.map((row) => row.product_id)

      const productlist = await products.findAll({
        where: { id: product_id }
      });

      const Map = {};

      order.forEach(p => {
        Map[p.product_id] = p.quantity;
      })

      productlist.forEach(product => {
        const quantity = Map[product.id];
        totalAmount += product.price * quantity;
      });

      return totalAmount
    }
  }
  products.init({
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
    paranoid: true,
    defaultScope: {
      attributes: {exclude: ["createdAt", "updatedAt", "password", "deletedAt"]}
    }
  });
  
  return products;
};