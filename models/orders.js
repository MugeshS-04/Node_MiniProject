'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users, {
        foreignKey : 'user_id'
      })
    }
  }
  orders.init({
    user_id: DataTypes.INTEGER,
    order_name: DataTypes.STRING,
    order_date: DataTypes.DATE,
    amount: DataTypes.DECIMAL(10,2),
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
    paranoid: true
  });
  return orders;
};