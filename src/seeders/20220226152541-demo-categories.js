"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Eventos",
          description: "Todo lo relacionado a eventos de la ONG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Campañas",
          description: "Todo lo relacionado a campañas promovidas por la ONG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Noticias",
          description: "Noticias relevantes sobre la organización",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
