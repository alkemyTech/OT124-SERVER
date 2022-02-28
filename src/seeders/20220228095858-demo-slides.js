'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('slides', [
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('slides', null, {});
  }
};
