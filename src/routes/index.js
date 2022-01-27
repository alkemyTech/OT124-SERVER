const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require("./news");
const activitiesRouter = require("./activities");
const testimonialsRouter = require("./testimonials");
const contactsRouter = require("./contacts");

<<<<<<< HEAD
router.use("/news", newRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/contacts", contactsRouter);
router.use("/activities", activitiesRouter);
=======
router.use('/news', newRouter)
router.use('/testimonials', testimonialsRouter);
router.use('/contacts', contactsRouter);
router.use('/activities', activitiesRouter);


//Importing the required routes here
//Example: const userRouter = require("./routes/user");

//assingning the routes to the router
// Example: router.use("/users", usersRouter);
>>>>>>> 40d1c471409af51132416f24d5901ad47f1f7537

apiRouter.use("/api/v1", router);

module.exports = apiRouter;
