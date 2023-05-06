const asyncMw = require('./catch-async');
const { user } = require('../models');
const ApiError = require('../utils/apiError');
const { unlinkFileIfExist } = require('../utils/file');

exports.registerMw = asyncMw(async (req, res, next) => {
  try {
    const exist = await user.findOne({ where: { username: req.body.username } });

    if (exist) throw new ApiError(400, 'username already used', { username: req.body.username });

    await user.create({ username: req.body.username, avatar: req.files?.avatar[0].filename });

    return res.sendStatus(201);
  } catch (error) {
    if (req.files?.avatar) {
      unlinkFileIfExist(req.files.avatar[0].path);
    }
    next(new ApiError(error.statusCode ?? error.status ?? 500, error.message, error.errorPayloads));
  }
});
