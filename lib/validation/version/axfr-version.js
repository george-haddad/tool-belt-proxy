const Joi = require('joi');

module.exports = {
  headers: Joi.object({
    accept: Joi.string()
      .regex(/^\bapplication\/vnd\.tool-belt\.axfr\b/)
      .required(),
  }),
};
