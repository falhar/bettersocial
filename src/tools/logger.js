const { format, createLogger, transports } = require('winston');
const config = require('../config');

const isProduction = config.app.env === 'production';

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const jsonifyObjectAndArray = format((info) => {
  if (info.message && typeof info.message === 'object') {
    Object.assign(info, { message: JSON.stringify(info.message, null, isProduction ? 0 : 2) });
  }

  return info;
});

exports.logger = createLogger({
  level: config.app.env === 'production' ? 'http' : 'debug',
  format: format.combine(
    enumerateErrorFormat(),
    jsonifyObjectAndArray(),
    isProduction ? format.uncolorize() : format.colorize(),
    format.splat(),
    format.timestamp({
      format: () => {
        return new Date().toLocaleString('en-AU', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'long',
          timeStyle: 'long',
        });
      },
    }),
    format.printf(
      ({ level, message, meta, timestamp }) =>
        `${level}: ${message}${meta ? ` - \n${JSON.stringify({ ...meta })}` : ''} - ${timestamp}`
    )
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
