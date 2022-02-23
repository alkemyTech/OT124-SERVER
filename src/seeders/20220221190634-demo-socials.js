'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('socials', [
      {
        organizationId: 1,
        facebook: 'facebook.com/somos_mas',
        linkedin: 'linkedin.com/in/somosmas',
        instagram: 'instagram.com/somos_mas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizationId: 2,
        facebook: 'facebook.com/amnistia',
        linkedin: 'linkedin.com/in/amnistia',
        instagram: 'instagram.com/amnistia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizationId: 3,
        facebook: 'facebook.com/apdh',
        linkedin: 'linkedin.com/in/apdh',
        instagram: 'instagram.com/apdh',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('socials', null, {});
  }
};
