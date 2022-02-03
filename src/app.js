require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.name)
  // response with server status depending by type of error
  switch (err.name) {
    case "NotFoundError":
      res.status(404);
      break;
    case "ValidationError":
    case "SequelizeValidationError":
      res.status(400);
      break;
    case "ConflictError":
      res.status(409);
      break;
    case "AuthorizationError":
      res.status(401);
      break;
    case "TokenExpiredError":
      res.status(403)
      break;
    default:
      res.status(500);
      break;
  }
  if (err.inner) {
    return res.send({ errors: err.inner.map((e) => e.message) });
  }
  return res.send({ errors: err.message });
});

module.exports = app;
