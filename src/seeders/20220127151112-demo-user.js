"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "User 1",
        lastName: "Doe",
        email: "example1@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 2",
        lastName: "Doe",
        email: "example2@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 3",
        lastName: "Doe",
        email: "example3@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 4",
        lastName: "Doe",
        email: "example4@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 5",
        lastName: "Doe",
        email: "example5@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 6",
        lastName: "Doe",
        email: "example6@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 7",
        lastName: "Doe",
        email: "example7@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 8",
        lastName: "Doe",
        email: "example8@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 9",
        lastName: "Doe",
        email: "example9@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 10",
        lastName: "Doe",
        email: "example10@example.com",
        password: "1234",
        roleId: "1",
      },
      {
        firstName: "User 11",
        lastName: "Doe",
        email: "example11@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 12",
        lastName: "Doe",
        email: "example12@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 13",
        lastName: "Doe",
        email: "example13@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 14",
        lastName: "Doe",
        email: "example14@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 15",
        lastName: "Doe",
        email: "example15@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 16",
        lastName: "Doe",
        email: "example16@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 17",
        lastName: "Doe",
        email: "example17@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 18",
        lastName: "Doe",
        email: "example18@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 19",
        lastName: "Doe",
        email: "example19@example.com",
        password: "1234",
        roleId: "2",
      },
      {
        firstName: "User 20",
        lastName: "Doe",
        email: "example20@example.com",
        password: "1234",
        roleId: "2",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { lastName: "Doe" });
  },
};
