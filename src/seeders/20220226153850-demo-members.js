"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "members",
      [
        {
          name: "María Iraola",
          position: "Presidente",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/a746e42f-1010-4719-9846-8673c133865e",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marita Gomez",
          position: "Fundadora",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/32cdf00c-797d-472d-b7e9-5a8f2b408141",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miriam Rodriguez",
          position: "Terapista Ocupacional",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/4071e6c9-1535-4f1a-8b6a-2e43b420d2f2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cecilia Mendez",
          position: "Psicopedagoga",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/766f41cb-5fac-469a-8842-611fbb03e837",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rodrgio Fuente",
          position: "Contador",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/e4427c60-0886-4788-92ba-726f33434afb",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "María García",
          position: "Profesora de Artes Dramáticas",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/610b456f-bd05-4d95-a0d7-6f6f45ef30e4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marco Fernandez",
          position: "Profesor de Educación Física",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/3df9bd2f-9e32-425b-9e4d-a82b385888f9",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
