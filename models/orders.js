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
    }

    static async createorder(orderdetails)
    {
      orderdetails.order_date = new Date()
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
      const orderslist = await orders.findOne({where : { id : order.id, user_id : user_id }})
      if(orderslist) return orderslist
      else throw new Error("No records found")
    }

    static async updateOrder(order, user_id)
    {
      const found_order = await orders.findOne({where : {id : order.id, user_id : user_id}})

      
      if(found_order)
        {
          const details = {}
          
          Object.entries(order).forEach(([index, value]) => {
          if(index != "id" && index != "user_id" && index != "order_date")
          {
            details[index] = value
          }
        })

        if (Object.keys(details).length === 0) {
          throw new Error("No valid fields to update")
        }

        const [updateCount] = await orders.update(details, {where : { id : order.id, user_id : user_id }})
        
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
      else
      {
        throw new Error("Order doesn't exist!")
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
    paranoid: true,
    defaultScope : {
      attributes : { exclude : ['deletedAt', 'createdAt', 'updatedAt']}
    }
  });
  return orders;
};