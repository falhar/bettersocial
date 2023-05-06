const { body } = require('express-validator');
const { validationErroMw } = require('./validator');

exports.registerValidatorMw = [
  body('username').notEmpty().withMessage('username required').isAlphanumeric().isLength({ max: 100 }),
  validationErroMw,
];
