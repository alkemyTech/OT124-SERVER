const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require('./news');
const activitiesRouter = require("./activities")
const testimonialsRouter = require("./testimonials")
const contactsRouter = require("./contacts")

router.use('/news', newRouter)
router.use('/activities', activitiesRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/contacts', contactsRouter);

//Importing the required routes here
//Example: const userRouter = require("./routes/user");

//assingning the routes to the router
// Example: router.use("/users", usersRouter);

apiRouter.use("/api/v1", router);

module.exports = apiRouter;
