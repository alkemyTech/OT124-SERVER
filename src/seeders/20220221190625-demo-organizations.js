"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("organization", [
      {
        name: "Somos Mas",
        image:
          "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/f0adcd5f-7a36-4b8d-9458-ea8e0b4b8d57",
        address: "Av. del Libertador 4980 Piso 2, Buenos Aires",
        phone: "541133519021",
        email: "somosmas@gmail.com",
        welcomeText: "Porque unidos, somos mas.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("organization", null, {});
  },
};
