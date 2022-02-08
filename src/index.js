require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.SERVER_PORT;

async function start() {
  try {
    await db.sequelize.sync();
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
