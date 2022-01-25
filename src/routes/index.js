const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require('./routes/news');

router.use('/news', newRouter)
//Importing the required routes here
//Example: const userRouter = require("./routes/user");

//assingning the routes to the router
// Example: router.use("/users", usersRouter);

apiRouter.use("/api/v1", router);

module.exports = apiRouter;
