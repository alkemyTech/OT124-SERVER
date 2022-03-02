const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = async (user) => {
  const token = jwt.sign(
    {
      user: 
      {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
      }
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
