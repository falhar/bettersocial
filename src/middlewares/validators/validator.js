const asyncMw = require('../catch-async');
const { myValidationResult } = require('../../utils/validationResult');
const ApiError = require('../../utils/apiError');
const { unlinkFileIfExist } = require('../../utils/file');

exports.validationErroMw = asyncMw(async (req, res, next) => {
  const errors = myValidationResult(req);

  if (!errors.isEmpty()) {
    if (req.files?.avatar) {
      unlinkFileIfExist(req.files.avatar[0].path);
    }
    next(new ApiError(422, 'Validation Error', errors.mapped()));
  } else {
    next();
  }
});
