'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('slides', [
      {
        text: 'Laura con los chicos',
        image: 'https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/30c964a6-b5e0-4813-8d98-90b92d755ba3',
        order: 1
      },
      {
        text: 'La felicidad de Ismael',
        image: 'https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/756b1d8d-e3d9-4a2c-bc6e-89245e54d888',
        order: 2
      },
      {
        text: 'Nuestras colaboradoras',
        image: 'https://cohorte-enero-835eb560.s3.us-east-1.amazonaws.com/3d1afb80-fb2a-4b10-adae-2f9b38bd82b5',
        order: 3
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('slides', null, {});
  }
};
