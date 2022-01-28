const express = require("express");
const apiRouter = express.Router();
const router = express.Router();
const newRouter = require("./news");
const activitiesRouter = require("./activities");
const testimonialsRouter = require("./testimonials");
const contactsRouter = require("./contacts");
const filesRouter = require("./files");
const authRouter = require("./auth");

router.use("/news", newRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/contacts", contactsRouter);
router.use("/activities", activitiesRouter);
router.use("/files", filesRouter);
router.use("/auth", authRouter);

apiRouter.use("/api/v1", router);

module.exports = apiRouter;
