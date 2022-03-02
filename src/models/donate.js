'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');

module.exports = (sequelize, DataTypes) => {
  class Donate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Donate.belongsTo(models.Users, {
        as: 'user',
        foreignKey: 'userId'
      });
    }
  }
  Donate.associate = (models)=> {
  
  }
  
  Donate.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    award: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amounts: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Donate',
  });
  
  return Donate;
};