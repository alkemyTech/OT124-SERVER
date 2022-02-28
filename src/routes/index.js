const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require("./news");
const activitiesRouter = require("./activities");
const testimonialsRouter = require("./testimonials");
const usersRouter = require("./users");
const contactsRouter = require("./contacts");
const filesRouter = require("./files")
const membersRouter = require('./members')
const authRouter = require("./auth");
const organizationsRouter = require("./organizations");
const categoriesRouter = require('./categories')
const contribuyeRouter = require('./contribuye')
const slidesRouter = require('./slides');


router.use("/news", newRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/contacts", contactsRouter);
router.use("/activities", activitiesRouter);
router.use("/users", usersRouter);
router.use('/files', filesRouter);
router.use('/categories', categoriesRouter);
router.use('/organizations', organizationsRouter);
router.use('/members', membersRouter);
router.use("/auth", authRouter);
router.use('/categories', categoriesRouter);
router.use('/donate', contribuyeRouter );
router.use('/slides', slidesRouter);

apiRouter.use("/api/v1", router);
module.exports = apiRouter;
