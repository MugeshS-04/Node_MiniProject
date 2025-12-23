const bcrypt = require('bcrypt')

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.orders, {
        foreignKey: 'user_id'
      })
    }

    static async register(data)
    {
        const existinguser = await users.findOne({where : { email : data.email }})
        
        if(existinguser)
        {
          throw new Error("User already Exists!")
        }
        else
        {
          data.password = await bcrypt.hash(data.password, 10) 
          const user = await users.create(data)
          return user
        }
    }

    static async login(data)
    {
        const user = await users.findOne({where : { email : data.email }})
        
        if(user)
        {
          const isvalid = await bcrypt.compare(data.password, user.password)

          if(isvalid)
          {
            return user
          }
          throw new Error("Incorrect Password")
        }
        else
        {
          throw new Error("User doesn't Exists!")
        }
    }

    static async updateUser(data, email)
    {
      if (Object.keys(data).length === 0) {
        throw new Error("No valid fields to update")
      }

      const [updateCount] = await users.update(data, {where : { email }})

      if(updateCount > 0)
      {
        return updateCount
      }
      
      throw new Error("No records Updated!")

    }

    static async deleteUser(email)
    {
      const deleteCount = await users.destroy({where : {email : email}})

      if(deleteCount > 0)
      {
        return deleteCount
      }
      else
      {
        throw new Error("User doesn't Exists!")
      }
    }
  }

  users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    contact_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    paranoid: true,
    defaultScope: {
      attributes: {exclude: ["createdAt", "updatedAt", "password", "deletedAt"]}
    }
  });

  return users;

};