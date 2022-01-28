const validation = (schema) => async (req, res, next) => {
  try {
    const body = req.body;
    await schema.validate(body, { abortEarly: false, stripUnknown: true });
    next();
  } catch (errs) {
    next(errs);
  }
};

module.exports = {
  validation,
};
