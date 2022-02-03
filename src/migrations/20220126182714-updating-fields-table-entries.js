"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("entries", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("entries", "deleteAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn("entries", "createdAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn("entries", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("entries", "image"),
      queryInterface.removeColumn("entries", "deleteAt"),
    ]);
  },
};
