import winston from 'winston';
import { context } from './context.js';

const { combine, timestamp, json, colorize, printf } = winston.format;

export const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        printf(({ level, message, timestamp }) => {
            const requestId = context.getStore()?.get('requestId') || 'System';
        const userId = context.getStore()?.get('userId') || 'Anonymous';
          return `${timestamp} [${level}]: ${message} [Request ID: ${requestId}] [User ID: ${userId}]`;
        })
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

