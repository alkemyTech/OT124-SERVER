const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require("./news");
const activitiesRouter = require("./activities");
const testimonialsRouter = require("./testimonials");
const usersRouter = require('./users')
const contactsRouter = require("./contacts");
const filesRouter = require("./files")

router.use("/news", newRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/contacts", contactsRouter);
router.use("/activities", activitiesRouter);
<<<<<<< HEAD
router.use("/users",usersRouter );
//router.use("/mentiritas",mentiritasRouter );

//Importing the required routes here
//Example: const userRouter = require("./routes/user");

//assingning the routes to the router
// Example: router.use("/users", usersRouter);



=======
router.use('/files', filesRouter);
>>>>>>> a15142851d1dacf67b6adc116eda1d00b99c0cfb

apiRouter.use("/api/v1", router);

module.exports = apiRouter;