'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // will be used later
    }

    static async createProduct(products, order_id)
    {
      const orderProductsData = products.map(p => ({
        order_id: order_id,
        product_id: p.product_id,
        quantity: p.quantity
      }));

      const result = await order_product.bulkCreate(orderProductsData)
      
      return result
    }

    static async updateProduct(products, order_id)
    { 
      await order_product.destroy({where : {order_id : order_id}})
      const orderProductsData = products.map(p => ({
        order_id: order_id,
        product_id: p.product_id,
        quantity: p.quantity
      }));

      const result = await order_product.bulkCreate(orderProductsData)

      return result
    }

    static async getProductDetails(order_id)
    {
      
      const orderProductsData = await order_product.findAll({where : {order_id : order_id}})

      return orderProductsData
    }
  }
  order_product.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_product',
    defaultScope: {
      attributes: {exclude: ["createdAt", "updatedAt", "password", "deletedAt", "order_id"]}
    }
  });

  return order_product;
};