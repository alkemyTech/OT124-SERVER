'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Entries", [
      {
        name: "Awesome title 1",
        content: "A large amount of content described here.",
        image: {key: "5c21b160-6cd2-41b6-96f2-27934bfd2f34"},
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 2",
        content: "A large amount of content described here.",
        image: {key: "5c21b160-6cd2-41b6-96f2-27934bfd2f34"},
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 3",
        content: "A large amount of content described here.",
        image: {key: "5c21b160-6cd2-41b6-96f2-27934bfd2f34"},
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 4",
        content: "A large amount of content described here.",
        image: {key: "5c21b160-6cd2-41b6-96f2-27934bfd2f34"},
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Awesome title 5",
        content: "A large amount of content described here.",
        image: {key: "5c21b160-6cd2-41b6-96f2-27934bfd2f34"},
        type: "news",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete("entries", null, {});
  }
};
