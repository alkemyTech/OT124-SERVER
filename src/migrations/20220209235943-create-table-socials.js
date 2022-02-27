"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "socials",
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        organizationId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "Organization",
            key: "id",
          },
          allowNull: false,
        },
        facebook: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        linkedin: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        instagram: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "socials",
        tableName: "socials",
        timestamps: true,
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("socials");
  },
};
