const isAdmin = async (req, res, next) => {
  try {
    console.log(req.role)
    if (req.role === "admin") {
      next();
    } 
    else{
      let err = new Error("Must be admin");
      err.name = "AuthorizationError";
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

const isDev = async (req, res, next) => {
  try {
    if (req.role === "dev") {
      next();
    } else {
      let err = new Error("Must be dev");
      err.name = "AuthorizationError";
      throw err;
    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  isAdmin,
  isDev
};
