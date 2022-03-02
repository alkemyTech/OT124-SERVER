"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "contacts",
      [
        {
          name: "Juan Perez",
          phone: "15687979856",
          email: "juan@perez.com",
          message: "Quería contactarme por la campaña de juguetes.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Martin Rodriguez",
          phone: "1547456856",
          email: "martin@rodriguez.com",
          message: "Me gustaría hacer una donacion a la ONG.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
