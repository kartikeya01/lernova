const validate = (schema) => (req, res, next) => {
  try {
    console.log(req.body);
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err,
    });
  }
};

module.exports = { validate };
