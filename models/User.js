const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init( // the structure of the user table
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: { // given by user
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        len: [1,12],
      },
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [1,22],
      },
    },
    isOrganizer: { // a check box will change this value to true, then we can insert handlebar partials to render if this value is true 
      type: DataTypes.BOOLEAN, // (ex. a create event form or edit event form, list all events with the creater_id matching user_id)
      defaultValue: false,
    },
    organization: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [1,22],
      },
    },
    organizationUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    completedEvents: {
      type: DataTypes.INTEGER
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updateUserData) => {
        updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
        return updateUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
