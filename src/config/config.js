require("dotenv").config();

module.exports = {
  development: {
    server_port: 5000,
    db_port: 3306,
    username: "root",
    password: null,
    database: "ong-dev",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  test: {
    server_port: 6000,
    db_port: 3306,
    username: "root",
    password: "root",
    database: "ong-test",
    host: "localhost",
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
  production: {
    server_port: process.env.SERVER_PORT,
    db_port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
};
