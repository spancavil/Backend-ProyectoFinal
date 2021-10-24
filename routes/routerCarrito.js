const express = require ('express');
const routerCarrito = express.Router();

const Carrito = require ('../api/Carrito');
const { loggerWarn } = require('../libs/loggerWinston');
const { sendGmailOrder, sendMailGmailwithOptions } = require('../libs/nodeMailer');

const carrito = new Carrito();

// Usamos los archivos de la carpeta public
routerCarrito.use(express.static('public'));

// GET /carrito/listar me devuelve todos los productos
routerCarrito.get('/listar', async (req, res)=>{
    const respuesta = await carrito.listar();
    res.json(respuesta);
})

//GET /carrito/listar/:id Devuelvo sólo el producto del carrito que coincida con el id pasado a través de params. O listar todos los productos del carrito
routerCarrito.get('/listar/:id', async (req,res)=>{
    const response = await carrito.listarId(req.params.id);
    res.json(response);
})

//POST /carrito/agregar/:id Guardar a través de POST un producto en el carrito a través de su id.
routerCarrito.post('/agregar/:id', async (req, res)=>{
    const user = req.user.username || req.user.displayName;
    //Agregado del username que le corresponde al carrito del usuario en cuestión
    const response = await carrito.guardar(req.params.id, user);
    res.json(response);
})

//DELETE /carrito/borrar/:id quitamos del carrito un producto por su id.
routerCarrito.delete('/borrar/:id', async (req, res) => {
    const response = await carrito.borrar(req.params.id);
    res.json(response);
})

//GET /carrito/cart vista del carrito.
routerCarrito.get('/cart', checkAuth, async (req,res)=> {

    const username = req.user.username || req.user.displayName;
    const photo = req.user.foto || req.user.photos[0].value;
    const phone = req.user.telefono || 'Sin teléfono definido';
    const productsInCart = await carrito.listar();
    const filteredProducts = productsInCart.filter(producto => producto.buyer === username);

    res.render('./cartView.ejs', {
        productos: filteredProducts,
        cantidad: filteredProducts.length,
        photo,
        username,
        phone,
    })
})

//POST /carrito/checkout Borra los elementos del carrito que corresponden al buyer loggeado, además envía las notificaciones correspondientes
routerCarrito.post('/checkout', checkAuth, async (req,res)=>{
    const {buyer, textoCompra, phone} = req.body;
    const email = req.user.email || req.user.emails[0].value;

    const responseGuardar = await carrito.guardarOrder(buyer);
    console.log("Orders: ", responseGuardar);

    const response = await carrito.borrarCarrito(buyer);
    if (response.n > 0) {
        //Enviamos el pedido por mail al admin
        sendGmailOrder(buyer, textoCompra, phone, email)
        console.log(textoCompra);
        
        //Enviamos el pedido por mail al usuario
        const mailOptions = {
            from: 'The backend burger',
            to: email,
            subject: `El detalle de su pedido en Backend Burger`,
            html: textoCompra,
        }
        sendMailGmailwithOptions(mailOptions)
    }
    res.send(response)
})

//Ruta accesible a través del front
routerCarrito.get('/orders', checkAuth, async (req,res) => {

    const user = req.user.username || req.user.displayName;
    const photo = req.user.foto || req.user.photos[0].value;
    const phone = req.user.telefono || 'Sin teléfono definido';

    console.log(user);

    const orders = await carrito.listarOrdenesComprador(user);
    res.render('./orders.ejs', {
        orders,
        cantidad: orders.length,
        photo,
        user,
        phone,
    })
})

//Obtenemos todas las orders a través de POSTMAN
routerCarrito.get('/getall-orders', async (req,res) => {
    const {admin} = req.body;
    if (admin){
        const orders = await carrito.listarOrdenes();
        res.send(orders);
    } else {
        res.send({Error: "Only admins see this information"})
    }
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        loggerWarn.log("warn", "Se intento ingresar a /datos sin autenticación");
        res.redirect('/');
    }
}

module.exports = routerCarrito;