"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activities.init(
    {
      name: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "activities",
      tableName: "activities",
      timestamps: true,
      paranoid: true
    }
  );
  return Activities;
};
