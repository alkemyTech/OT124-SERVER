const express = require("express");
const apiRouter = express.Router();
const router = express.Router();

const activitiesRouter = require("./activities")

router.use(('/activities'), activitiesRouter);

//Importing the required routes here
//Example: const userRouter = require("./routes/user");

//assingning the routes to the router
// Example: router.use("/users", usersRouter);

apiRouter.use("/api/v1", router);

module.exports = apiRouter;
