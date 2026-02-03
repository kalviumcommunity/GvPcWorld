import winston from 'winston';
const { combine, timestamp, json, colorize, printf } = winston.format;
const logger = winston.createLogger({
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
                    return `${timestamp} [${level}]: ${message}`;
                })
            )
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});