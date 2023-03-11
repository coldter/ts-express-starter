import winston from 'winston';
import { highlight } from 'cli-highlight';

const logConfiguration = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.label({
      label: `Code log:📝`,
    }),
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.json(),
    winston.format.printf((info) => {
      const splatArgs = info[Symbol.for('splat')] || [];
      const printArgs = splatArgs.map((arg: any) => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2);
        }
        return arg;
      });
      return `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message} ${
        splatArgs.join(' ')
          ? `🔰️🔰️🔰️🔰️🔰️\n${highlight(printArgs.join('\n'), {
              language: 'json',
              ignoreIllegals: true,
            })}`
          : ''
      }`;
    }),
  ),
  colorize: true,
};

/**
 * @description This is a custom logger that can be used to log messages to the console
 * @param {string} message - The message to be logged
 * level - The level of the log message
 * (info, error, warn)
 */
export const logger = winston.createLogger(logConfiguration);
