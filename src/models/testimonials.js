"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Testimonials extends Model {
    static associate(models) {
    }
  }
  Testimonials.init(
    {
      name: DataTypes.STRING,
      lastimage: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "testimonials",
    }
  );
  return Testimonials;
};
