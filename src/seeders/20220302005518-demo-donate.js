'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Donate', [
      {
        award: 'gold',
        amounts: 7789,
        userId: 1
      },
      {
        award: 'silver',
        amounts: 3020,
        userId: 2
      },
      {
        award: 'bronce',
        amounts: 559,
        userId: 3
      },
      {
        award: 'noobie',
        amounts: 10,
        userId: 4
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Donate', null, {});
  }
};