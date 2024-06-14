const Joi = require("joi");

const credentialsSchema = Joi.object({
  email: Joi.string()
    .regex(/[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/i)
    .message("please provide a valid email format")
    .max(150)
    .required(),
  password: Joi.string().max(255).required(),
});

const validateCredentials = (req, res, next) => {
  const { error } = credentialsSchema.validate(
    { ...req.body },
    { abortEarly: false }
  );

  if (error) return res.status(400).json({ validationErrors: error.details });

  return next();
};

module.exports = validateCredentials;
