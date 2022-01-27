"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Activities",
      [
        {
          name: "Apoyo Escolar para el nivel Primario",
          image:
            "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
          content: `El espacio de apoyo escolar es el corazón del área educativa. Se realizan los
            talleres de 
            `,
          deleteAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apoyo Escolar Nivel Secundaria",
          image:
            "https://drive.google.com/uc?export=view&id=1EfWmYnA2R49ZW8anbMT9Hg2J02pVT5D9",
          content: `
            Del mismo modo que en primaria, este taller es el corazón del área
            secundaria. 
          `,
          deleteAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tutorías",
          image:
            "https://drive.google.com/uc?export=view&id=1yqHbCDAx6FFbN1mRj0dCvEkjeqSsov2u",
          content: `
            Es un programa destinado a jóvenes a partir del tercer año de secundaria,
            cuyo objetivo es 
            `,
          deleteAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Activities");
  },
};
