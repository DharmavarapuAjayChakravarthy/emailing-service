const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    transports:[
        new transports.Console(),
    ],
    format: format.combine(
        format.json(),
        format.errors({stack:true}),
        format.printf(
            ({level, message,stack}) => 
            `${level}: ${level=='error' ? (message || '') + stack ?.split('\n')?.join(' ') : message}`
        ),
    ),
});

module.exports = {logger};