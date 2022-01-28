const authorize = () => async (req, res, next) => {
  try {
    if (req.body.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  authorize,
};
