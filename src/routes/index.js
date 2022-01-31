const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require("./news");
const activitiesRouter = require("./activities");
const testimonialsRouter = require("./testimonials");
const usersRouter = require('./users')
const contactsRouter = require("./contacts");
const filesRouter = require("./files");
const categoriesRouter = require("./categories");

router.use("/news", newRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/contacts", contactsRouter);
router.use("/activities", activitiesRouter);
router.use("/users",usersRouter );
router.use('/files', filesRouter);
router.use('/categories', categoriesRouter);
router.use('/organizations', organizationsRouter);


apiRouter.use("/api/v1", router);
module.exports = apiRouter;