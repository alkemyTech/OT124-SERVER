const express = require("express");
const apiRouter = express.Router();
const router = express.Router();

//Importing the required routes here
//Example: const userRouter = require("./routes/user");
const newRouter = require("./news");
const activitiesRouter = require("./activities");
const testimonialsRouter = require("./testimonials");

//assingning the routes to the router
// Example: router.use("/users", usersRouter);
router.use("/news", newRouter);
router.use("/activities", activitiesRouter);
router.use("/testimonials", testimonialsRouter);

apiRouter.use("/api/v1", router);

module.exports = apiRouter;
