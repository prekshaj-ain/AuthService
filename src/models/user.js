'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'User_Roles',
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,18],
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user)=>{
    const encryptedpassword = bcrypt.hashSync(user.password,12);
    user.password = encryptedpassword;
  })

  return User;
};