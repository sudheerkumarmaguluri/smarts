var winston = require('winston')

winston.add(
  winston.transports.File, {
    filename: 'somefile.log',
    level: 'warn',
    json: true,
    eol: 'rn', // for Windows, or `eol: ‘n’,` for *NIX OSs
    timestamp: true
  }
)

winston.log('warn', 'Hello log files!')
winston.warn('Hello again log files!')
