"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {
    
    static associate(models) {
      Entries.belongsTo(models.organization);
    }
  }
  Entries.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deleteAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "organization",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "entries",
      tableName: "entries",
      timestamps: true,
      paranoid: true,
    }
  );
  return Entries;
};
