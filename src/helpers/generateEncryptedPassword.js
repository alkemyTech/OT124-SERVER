const bycrypt = require("bcryptjs");

const generateEncryptedPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

module.exports = {
  generateEncryptedPassword,
};
