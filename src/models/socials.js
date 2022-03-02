"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Socials extends Model {}
  Socials.associate = function (models) {
    models["socials"].belongsTo(models["organization"]);
  };

  Socials.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "socials",
      tableName: "socials",
      timestamps: true,
      paranoid: true,
    }
  );

  return Socials;
};
