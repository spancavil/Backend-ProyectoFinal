const config = require('../cfg/config')

const mongoose = require('mongoose');
const { loggerConsole, loggerError } = require('../libs/loggerWinston');

const connection = mongoose.connect(config.MONGOCONN, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    loggerConsole.log('debug','[Mongoose] - connected in: cluster0.vchky.mongodb.net');
});

mongoose.connection.on('error', (err) => {
    loggerError.log('error','[Mongoose] - error:', err);
});

module.exports = connection;