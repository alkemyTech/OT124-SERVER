"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "activities",
      [
        {
          name: "Apoyo Escolar para el nivel Primario",
          image:
            "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
          content: `El espacio de apoyo escolar es el corazón del área educativa. Se realizan los
            talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el
            contraturno, Los sábados también se realiza el taller para niños y niñas que
            asisten a la escuela doble turno. Tenemos un espacio especial para los de
            1er grado 2 veces por semana ya que ellos necesitan atención especial!
            Actualmente se encuentran inscriptos a este programa 150 niños y niñas de
            6 a 15 años. Este taller está pensado para ayudar a los alumnos con el
            material que traen de la escuela, también tenemos una docente que les da
            clases de lengua y matemática con una planificación propia que armamos
            en Manos para nivelar a los niños y que vayan con más herramientas a la
            escuela.
            `,
          deletedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apoyo Escolar Nivel Secundaria",
          image:
            "https://drive.google.com/uc?export=view&id=1EfWmYnA2R49ZW8anbMT9Hg2J02pVT5D9",
          content: `
            Del mismo modo que en primaria, este taller es el corazón del área
            secundaria. Se realizan talleres de lunes a viernes de 10 a 12 horas y de 16 a
            18 horas en el contraturno. Actualmente se encuentran inscriptos en el taller
            50 adolescentes entre 13 y 20 años. Aquí los jóvenes se presentan con el
            material que traen del colegio y una docente de la institución y un grupo de
            voluntarios los recibe para ayudarlos a estudiar o hacer la tarea. Este
            espacio también es utilizado por los jóvenes como un punto de encuentro y
            relación entre ellos y la institución.
          `,
          deletedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tutorías",
          image:
            "https://drive.google.com/uc?export=view&id=1yqHbCDAx6FFbN1mRj0dCvEkjeqSsov2u",
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
          deletedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("activities", null, {});
  },
};
