require("dotenv").config();
const { noExtendLeft } = require("sequelize/types/lib/operators");
const app = require("./app");
const db = require("./models");

const PORT = process.env.SERVER_PORT;

async function start() {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}
start();
