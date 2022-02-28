"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "testimonials",
      [
        {
          name: "Carla",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/7cca230b-e7eb-4702-bc88-8f51488d23c8",
          content: `
              Me encanta como trabajan en la ONG. Muy responsables y al servicio.
            `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pedro",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/d2dfceb3-545f-46f4-a02a-0974409caac0",
          content: `
              Somos Más es un gran espacio para los chicos y muy positivo para las familias.
            `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Juan",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/f2149525-3eef-42dd-b936-3ba21cb123c7",
          content: `
              Gracias a la ONG mis hijos pueden desarrollarse mejor en la escuela.
            `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marta",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/5a38ab4c-6528-455a-98ea-036160d7af67",
          content: `
              Me gusta la calidad de los vinculos que existe en Somos Más.
            `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("activities", null, {});
  },
};
