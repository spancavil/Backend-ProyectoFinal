const dotenv = require('dotenv');
const arguments = require('yargs').argv

dotenv.config()

//Configuramos la persistencia en base a los argumentos
const PERSISTENCE = arguments._[0] === "dev" ? "SQLite" : "Mongo";

const config = {
    PORT : process.env.PORT,
    FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    MONGOCONN : process.env.MONGOCONN,
    DESTINATARIO: process.env.DESTINATARIO,
    ADMINEMAIL: process.env.ADMINEMAIL,
    USERGMAIL: process.env.USERGMAIL,
    PASSGMAIL: process.env.PASSGMAIL,
    ALOJAMIENTO: process.env.ALOJAMIENTO,
    SECRET: process.env.SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
    PERSISTENCE
}

module.exports = config;