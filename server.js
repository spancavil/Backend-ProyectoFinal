const express = require('express');
const morgan = require('morgan');
const routerProductos = require('./routes/routerProductos');
const routerCarrito = require('./routes/routerCarrito');
const routerAccount = require('./routes/routerAccount')
require('dotenv').config();

const config = require ('./cfg/config');

//Loggers
const { loggerConsole, loggerError } = require('./libs/loggerWinston');

//Nos conectamos con Mongo Atlas
require('./databases/mongoAtlas')

const app = express();

// Usamos los archivos de la carpeta public
app.use(express.static('public'));

const passport = require('./passport/passport');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Morgan nos informa en forma breve de cada uso que se la da a nuestra app
app.use(morgan('dev'));

//Atajamos todos los posibles errores del server. Lo renderizamos mediante un pug.
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Oops! something went wrong...');
});

//Motor de plantillas EJS y PUG
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view engine', 'pug');

app.use(session({
    store: MongoStore.create({
        //Salvamos los datos de la session en Mongo (sessions)
        mongoUrl: config.MONGOCONN,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: config.EXPIRES_IN * 1000 * 60
    },
}))

app.use(passport.initialize());
//Con cada uso de la app usamos la session en caso de existir una
app.use(passport.session());

//Definimos 3 routers
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);
app.use('/', routerAccount)

const PORT = config.PORT;

const server = app.listen(PORT, () => {
    loggerConsole.log('debug', `Server listening at http://localhost:${PORT}`);
});

server.on('error', () => {
    loggerError.log('An error ocurred while setting up server.');
})