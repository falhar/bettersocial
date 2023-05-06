const { validationResult } = require('express-validator');

exports.myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      message: error.msg,
    };
  },
});
