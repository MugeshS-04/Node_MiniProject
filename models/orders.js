'use strict';
const { Model } = require('sequelize');
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

      orders.belongsToMany(models.products, { 
        through: models.order_product,
        foreignKey: "order_id",
      })
    }

    static async createorder(orderdetails, user_id, amount)
    {
      orderdetails.order_date = new Date()

      orderdetails.user_id = user_id

      orderdetails.amount = amount
      
      if(!orderdetails.order_name)
      {
        orderdetails.order_name = "order_"+orderdetails.order_date  
      }
      
      const order = await orders.create(orderdetails)
      
      return order
    }

    static async getallOrders(user_id)
    {
      const orderslist = await orders.findAll({where : {user_id : user_id}})
      return orderslist
    }

    static async getOrderDetails(order, user_id)
    {
      const orderslist = await orders.findOne({ attributes : {exclude : ["createdAt" , "updatedAt", "id", "user_id"]}}, {where : { id : order.id, user_id : user_id }})
      if(orderslist) return orderslist
      else throw new Error("No records found")
    }

    static async updateOrder(order, user_id, amount)
    {
      if (Object.keys(order).length === 0) {
        throw new Error("No valid fields to update")
      }
      order.amount = amount
      
      const [updateCount] = await orders.update(order, {where : { id : order.id, user_id : user_id }})
      
      if(updateCount > 0)
      {
        return updateCount
      }
      else
      {
        console.log(updateCount)
        throw new Error("No records Updated!")
      }
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
    defaultScope: {
      attributes: {exclude: ["createdAt", "updatedAt", "password", "deletedAt", "id"]}
    }
  });
  return orders;
};