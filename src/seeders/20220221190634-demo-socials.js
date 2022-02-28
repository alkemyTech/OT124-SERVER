'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('socials', [
      {
        organizationId: 1,
        facebook: 'https://www.facebook.com/somos_mas',
        linkedin: 'https://www.linkedin.com/in/somosmas',
        instagram: 'https://www.instagram.com/somos_mas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizationId: 2,
        facebook: 'https://www.facebook.com/amnistia',
        linkedin: 'https://www.linkedin.com/in/amnistia',
        instagram: 'https://www.instagram.com/amnistia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizationId: 3,
        facebook: 'https://www.facebook.com/apdh',
        linkedin: 'https://www.linkedin.com/in/apdh',
        instagram: 'https://www.instagram.com/apdh',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('socials', null, {});
  }
};
