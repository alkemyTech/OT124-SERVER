'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const general = await generateEncryptedPassword("123456") 
    return queryInterface.bulkInsert("Users", [
      {
        name: "Awesome title 1",
        content: "A large amount of content described here.",
        image: "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 2",
        content: "A large amount of content described here.",
        image: "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 3",
        content: "A large amount of content described here.",
        image: "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 4",
        content: "A large amount of content described here.",
        image: "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 5",
        content: "A large amount of content described here.",
        image: "https://drive.google.com/uc?export=view&id=1ileZuq6dMphx9i-aFtz95iSDRsRVZgLj",
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("entries", null, {});
  }
};
