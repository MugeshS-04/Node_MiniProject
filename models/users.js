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
      const user = await users.findOne({where : { email : email }})

      const details = {}
      
      Object.entries(data).forEach(([key, value]) => {
        if(key !== "id" && key !== "password" && key !== "email") {
          details[key] = value;
        }
      })

      if (Object.keys(details).length === 0) {
        throw new Error("No valid fields to update")
      }

      if(user)
      {
        const [updateCount] = await users.update(details, {where : { email }})

        if(updateCount > 0)
        {
          return updateCount
        }
        throw new Error("No records Updated!")
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
    paranoid: true
  });
  return users;

};