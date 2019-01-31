const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, printf } = format;

const myFormat = printf(( { url, method, date } = info) => {
    return `${url} (${method}): ${date}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'url-data.log' })
    ]
})

module.exports = logger;