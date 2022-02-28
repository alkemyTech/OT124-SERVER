const isAdmin = async (req, res, next) => {
  const {user} = req
  try {
    if (user?.role === "admin") {
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
  const {user} = req
  try {
    if (user?.role === "dev") {
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

const isAdminOrItself = async (req, res, next) => {
  const {user} = req
  const {id} = req.params

  console.log(user.id)
  console.log(id)

  console.log(user?.role)
  try {
    if (user?.role == "admin") {
      console.log("Entra")
      return next();
    }
    if (user?.id == id) {
      return next();
    }

    console.log("No entra - Lo que se pidio")
    
    let err = new Error("Must be admin");
    err.name = "AuthorizationError";
    throw err;
    
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isAdmin, isAdminOrItself,
  isDev
};
