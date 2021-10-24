const express = require ('express');
const routerAccount = express.Router();
const config = require('../cfg/config');

//Manejo de archivos con multer
const multer = require('multer');
const uploadPhoto = multer({ dest: './public/userPhotos'});
const passport = require('../passport/passport');

//Modelos de usuario
const Users = require('../models/Users');

//Carrito y productos
const Carrito = require('../api/Carrito');
const Producto = require('../api/Producto');
const producto = new Producto;
const carrito = new Carrito;

//Loggers
const { loggerWarn } = require('../libs/loggerWinston');

//Funciones para envío de mail y sms modularizadas
const {sendMailGmailSignup} = require('../libs/nodeMailer');

//Obtenemos un Token, en caso de necesitar en un futuro
const { getJwtToken } = require('../auth/jwt');

// Usamos los archivos de la carpeta public
routerAccount.use(express.static('public'));

//SIGNUP
routerAccount.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

//Usamos multer como middleware para subir la foto a public (uploadPhoto)
routerAccount.post('/signup', uploadPhoto.single('foto'),
    passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/successsignup' })
)

routerAccount.get('/failsignup', (req, res) => {
    res.send('<h1> Error al registrar al usuario! </h1>');
})

routerAccount.get('/successsignup', async (req, res) => {

    //Encontramos el último usuario agregado, ordenado por id de manera descendente
    let lastUserAdded = await Users.find({}).sort({_id: -1}).limit(1)
    //console.log("Ultimo usuario:", lastUserAdded);
    const mailOptions = {
        from: 'The backend burger',
        to: config.ADMINEMAIL,
        subject: `Nuevo usuario registrado al sitio!`,
        html: `<h4 style="color: blue;">Sign up con username: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}. Fecha: ${new Date().toLocaleString()}</h4>`
    }
    sendMailGmailSignup(mailOptions);
    loggerWarn.warn("warn", `Sign up con username: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}. Fecha: ${new Date().toLocaleString()}`)
    res.render(`successsignup.ejs`);
})

//HOME - LOGIN
routerAccount.get('/', (req, res) => {
    res.render('login.ejs');
})

//Endpoint para chequear el login.
routerAccount.post('/login',
    passport.authenticate('login', { failureRedirect: '/failsignin', successRedirect: '/datos' })
);

//Endpoint para chequear el login.
routerAccount.get('/login-facebook',
    passport.authenticate('facebook')
);

routerAccount.get('/login-facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/datos',
        failureRedirect: '/failsignin'
    }
));

routerAccount.get('/failsignin', (req, res) => {
    res.render('failsignin.ejs');
})

routerAccount.get('/datos', checkAuth, async (req, res) => {
    

    //Definimos datos de usuario
    const user = req.user.username || req.user.displayName;
    const id = req.user.id || req.user._id;
    const photo = req.user.foto || req.user.photos[0].value;

    loggerWarn.log('warn', `El usuario ${user} con id: ${id} ingresó a /datos`)

    const productosDB = await producto.listar();
    //Productos correspondientes al usuario en cuestión
    const productosEnCarrito = await carrito.listar();
    const productosEnCarritoFiltrados = productosEnCarrito.filter(producto => producto.buyer === user);

    res.render('datos.ejs', {
        username: user,
        photo,
        hayProductos: true,
        productos: productosDB,
        productosEnCarritoFiltrados: productosEnCarritoFiltrados.length
    });
})

//Middleware para chequear que esté loggeado como el username correcto. En caso de no, se envía un 401.
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        //Renovamos el tiempo de la session con cada request, dura 15 minutos.
        req.session.touch();
        next();
    } else {
        loggerWarn.log("warn", "Se intento ingresar a /datos sin autenticación");
        res.redirect('/');
    }
}

routerAccount.get('/logout', (req, res) => {
    req.logout();
    res.render('logout.ejs');
})

//implementable a futuro, actualmente sólo se utiliza session combinado con passport.
routerAccount.post('/get-token', (req, res)=> {
    const {username, userId} = req.body;
    return res.json(getJwtToken(username, userId))
})

module.exports = routerAccount;