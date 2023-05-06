/* eslint-disable no-shadow */
const moment = require('moment');
const multer = require('multer');
const fs = require('fs');
const ApiError = require('../utils/apiError');
const { getUploadDirectory, isFileAllowed } = require('../utils/file');
const asyncMw = require('./catch-async');
const { fileType } = require('../utils/constants');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryPath = getUploadDirectory(file.fieldname);

    if (!directoryPath) {
      throw new ApiError(400, 'Invalid File Type', { fieldname: file.fieldname });
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.mkdirSync(directoryPath, { recursive: true });
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${moment().unix()}_${file.originalname.replace(' ', '_')}`;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const isAllowed = isFileAllowed(file);
  if (!isAllowed) {
    return cb(new ApiError(400, 'Invalid File', { fieldname: file.fieldname }));
  }

  return cb(null, true);
};

exports.uploadAvatarMw = asyncMw(async (req, res, next) =>
  multer({ storage: fileStorage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } }).fields([
    {
      name: fileType.avatar,
      maxCount: 1,
    },
  ])(req, res, next)
);
