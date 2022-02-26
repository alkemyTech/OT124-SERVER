"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "entries",
      [
        {
          name: "Juguetes por mas Sonrisas",
          content:
            "En esta campaña se busca recolectar juguetes para entregar a los chicos el dia del niño.",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/a837cb98-90fd-4675-8166-98870fc21f28",
          type: "news",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kermesse anual",
          content:
            "Este miercoles se llevará a cabo la kermesse anual para colecta de fondos de la ONG.",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/3b24e4d9-baff-4a99-8a6d-f2608a276f4a",
          type: "news",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vuelta al cole",
          content:
            "Como todos los inicios de año, la ONG esta recibiendo útiles escolares para repartir a los chicos en el comienzo de clases.",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/f2fe2123-822d-40fa-a844-879869c0504a",
          type: "news",
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Inicio de actividades",
          content:
            "Información acerca del inicio de actividades en este año. Retomaremos las actividades y talleres a partir del 1 de Marzo.",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/c05bf7f9-3b3f-49c9-abfe-55283c93b997",
          type: "news",
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
