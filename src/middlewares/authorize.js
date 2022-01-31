const authorize = () => async (req, res, next) => {
  try {
    if (req.role === "admin") {
      next();
    } else {
      let err = new Error("Unauthorized");
      err.name = "AuthorizationError";
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorize,
};
