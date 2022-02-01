const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateJWT = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = {
  generateJWT,
};
