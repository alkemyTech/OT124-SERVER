const isAdmin = () => async (req, res, next) => {
  try {
    if (req.role === "admin") {
      next();
    } else {
      let err = new Error("Must be admin");
      err.name = "AuthorizationError";
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isAdmin,
};
