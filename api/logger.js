const { transports, createLogger, format } = require('winston');
const { ENV, LOCAL } = require('./constants/envVariables');

const { combine, timestamp, prettyPrint, errors } = format;

const formatArray = [errors({ stack: true }), timestamp()];

if (ENV === LOCAL) {
  formatArray.push(prettyPrint());
} else {
  formatArray.push(format.json());
}
const logger = createLogger({
  level: 'info',
  defaultMeta: { service: 'api' },
  format: combine(...formatArray),
  transports: [new transports.Console()],
});

module.exports = {
  logger,
};
