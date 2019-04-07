import {Logger, createLogger, transports, format} from "winston";

export const logger: Logger = createLogger({
  exitOnError: false,
  level: 'info',
  format: format.combine(
    format.label({ label: 'ToDoApp' }),
    format.colorize(),
    format.timestamp(),
    format.printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/combined.log'
    })
  ]
});
