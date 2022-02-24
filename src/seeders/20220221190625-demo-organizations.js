'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('organization', [
      {
        name: 'Somos Mas',
        image: 'https://github.com/alkemyTech/OT124-CLIENT/blob/client-development/src/img/logo-somos-mas.png?raw=true',
        address: 'Av. del Libertador 4980 Piso 2, Buenos Aires',
        phone: '+541133519021',
        email: 'somosmas@gmail.com',
        welcomeText: 'Porque unidos, somos mas.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amnistía internacional sección Argentina',
        image: 'https://amnistia.org.ar/wp-content/themes/amnistia/img/share.png',
        address: 'Av. Corrientes 1628, Buenos Aires',
        phone: '+541148116469',
        email: 'contacto@amnistia.org.ar',
        welcomeText: 'El mundo puede cambiar. Pero no va a cambiar solo.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asamblea permanente por los derechos humanos.',
        image: 'https://www.apdh-argentina.org.ar/sites/default/files/logo.png',
        address: 'Av. Callao 569 3° cuerpo 1° piso, Buenos Aires',
        phone: '+541143728594',
        email: 'apdh@apdh.org.ar',
        welcomeText: 'La codicia no tiene límites, la naturaleza si.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Abuelas de Plaza de Mayo',
        image: 'https://www.abuelas.org.ar/img/logo.png',
        address: 'Virrey Cevallos 592, Buenos Aires',
        phone: '+541143840983',
        email: 'abuelas@abuelas.org.ar',
        welcomeText: 'Vos podés ser uno de los nietos que estamos buscando.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("organization", null, {});
  }
};
