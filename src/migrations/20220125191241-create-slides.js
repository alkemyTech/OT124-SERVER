"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "slides",
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        order: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        organizationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "organization",
            key: "id",
          },
        },
      },
      {
        modelName: "slides",
        tableName: "slides",
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("slides");
  },
};
