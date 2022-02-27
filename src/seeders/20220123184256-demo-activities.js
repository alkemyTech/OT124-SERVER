"use strict";

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "activities",
      [
        {
          name: "Apoyo Escolar para el nivel Primario",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/a922da66-ca72-4dd6-9859-9bf916838a13",
          content: `El espacio de apoyo escolar es el corazón del área educativa. Se realizan los
            talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el
            contraturno, Los sábados también se realiza el taller para niños y niñas que
            asisten a la escuela doble turno. 
            `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apoyo Escolar Nivel Secundaria",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/1c83f7f5-168f-46ab-a4e7-577e8a8412a0",
          content: `
            Del mismo modo que en primaria, este taller es el corazón del área
            secundaria. Se realizan talleres de lunes a viernes de 10 a 12 horas y de 16 a
            18 horas en el contraturno. Actualmente se encuentran inscriptos en el taller
            50 adolescentes entre 13 y 20 años.
          `,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tutorías",
          image:
            "https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/49fb9434-90cd-4a2a-9c91-eabc6e06c334",
          content: `
            Es un programa destinado a jóvenes a partir del tercer año de secundaria,
            cuyo objetivo es garantizar su permanencia en la escuela y construir un
            proyecto de vida que da sentido al colegio. El objetivo de esta propuesta es
            lograr la integración escolar de niños y jóvenes del barrio promoviendo el
            soporte socioeducativo y emocional apropiado, desarrollando los recursos
            institucionales necesarios a través de la articulación de nuestras
            intervenciones con las escuelas que los alojan, con las familias de los
            alumnos y con las instancias municipales, provinciales y nacionales que
            correspondan.
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
