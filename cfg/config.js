const arguments = require('yargs').argv

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env')});

//Configuramos la persistencia en base a los argumentos:
const PERSISTENCE = arguments._[0] === "dev" ? "SQLite" : "Mongo";
//Configuramos mongo local o atlas según argumentos:
const LOCAL = arguments._[1] === "local" ? true: false;

const config = {
    PORT : process.env.PORT,
    FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    MONGOCONN : LOCAL ? process.env.MONGOCONNLOCAL: process.env.MONGOCONNATLAS,
    ADMINEMAIL: process.env.ADMINEMAIL,
    USERGMAIL: process.env.USERGMAIL,
    PASSGMAIL: process.env.PASSGMAIL,
    ALOJAMIENTO: process.env.ALOJAMIENTO,
    SECRET: process.env.SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
    PERSISTENCE
}

module.exports = config;