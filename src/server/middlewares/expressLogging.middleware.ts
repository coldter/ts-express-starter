import expressWinston from 'express-winston';
import winston from 'winston';

export const developmentLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.label({
      label: `Request/Response Log📨`,
    }),
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf((info) => {
      return `${info.level}: ${info.label}: ${[info.timestamp]}:\n ${info.message}`;
    }),
  ),
  responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}} Queries:{{JSON.stringify(req.query)}} {{res.statusCode}}\nREQUEST HEADERS::\n {{JSON.stringify(req.headers)}}\nREQUEST BODY::\n {{JSON.stringify(req.body, null, 2)}}\nRESPONSE BODY::\n {{JSON.stringify(res.body, null, 2)}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});
