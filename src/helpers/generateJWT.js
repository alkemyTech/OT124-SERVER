const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1hr",
    }
  );
  return token;
};

module.exports = {
  generateJWT,
};
