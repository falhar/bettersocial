/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const { fileType } = require('./constants');
const config = require('../config');

/**
 * Unlink / delete file from disk if it exists
 * @param {string} path example './uploads/images/image.png'
 * @returns {boolean} - true if file was deleted, false if file doesn't exist
 */
exports.unlinkFileIfExist = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    return true;
  }
  return false;
};

/**
 * Get file upload directory based on file type
 * @param {fileType} type
 * @returns {string}
 */
exports.getUploadDirectory = (type) => {
  switch (type) {
    case fileType.avatar:
      return config.directory.avatar;
    default:
      return null;
  }
};

/**
 * Check if file extension is allowed based on file type
 * @param {File}
 * @returns
 */
exports.isFileAllowed = (file) => {
  switch (file.fieldname) {
    case 'avatar':
      return ['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype);
    default:
      return null;
  }
};
