"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("socials", [
      {
        organizationId: 1,
        facebook: 'https://www.facebook.com/somos_mas',
        linkedin: 'https://www.linkedin.com/in/somosmas',
        instagram: 'https://www.instagram.com/somos_mas',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("socials", null, {});
  },
};
