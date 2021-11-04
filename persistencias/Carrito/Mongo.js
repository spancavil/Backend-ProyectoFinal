const CarritoMongo = require ('../../models/CarritoMongo');
const CarritoI = require ('../../persistencias/persistenciaCarritoInterface')
const ProductoMongo = require ('../../models/ProductosMongo');
const { loggerError, loggerConsole } = require('../../libs/loggerWinston');

//Connection mongo Atlas (sólo disponible atlas, pero se puede configurar a local)
const {ALOJAMIENTO} = require ('../../cfg/config');
require(`../../databases/mongo${ALOJAMIENTO}`);

const Orders = require('../../models/Orders')

class Mongo extends CarritoI{
    constructor(){
        super();
    }

    async listar(){
        try {
            const lista = await CarritoMongo.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay productos cargados"}
            }
        } catch (e) {
            loggerError.log('error',"Error al leer los mensajes: ", e);
            loggerConsole.log('error',"Error al leer los mensajes: ", e);
        }
    }

    async listarId(productoId){
        try {
            const producto = await CarritoMongo.findById(productoId);
            console.log(producto)
            if (producto){
                return producto;
            }
            else {
                return {message: "No hay producto en el carrito con ese id"};
            }
        } catch (e) {
            loggerError.log('error',"Error al listar por Id en Mongo: ", e);
            loggerConsole.log('error',"Error al listar por Id en Mongo: ", e);
        }
    }

    async guardar(productoId, username){
        try {
            const producto = await ProductoMongo.findById(productoId);
            if (producto){
                const response = await CarritoMongo.create({
                    producto: producto,
                    timestamp: (new Date()).toLocaleString(),
                    buyer: username
                })
                return response;
            }
        } catch (e) {
            loggerError.log('error',"Error al guardar un producto en carrito en mongo: ", e);
            loggerConsole.log('error',"Error al guardar un producto en carrito en mongo: ", e);
        }
    }

    async borrar(productoId){
        try {
            const response = await CarritoMongo.findById(productoId).deleteOne();
            if (response.n > 0)
                return {message: "Producto eliminado del carrito."};
            else {
                return {message: "Carrito no encontrado."}
            }
        } catch (e) {
            loggerError.log('error',"Error al borrar un producto en Mongo: ", e);
            loggerConsole.log('debug',"Error al borrar un producto en Mongo: ", e)

        }
    }

    async borrarCarrito(buyer){
        try {
            const response = await CarritoMongo.find({"buyer": buyer}).deleteMany();
            return (response);
        } catch (error) {
            loggerConsole ('debug', "Error al borrar el carrito: ", error)
            loggerError.log('error',"Error al borrar un carrito en Mongo: ", e)
        }
    }

    async guardarOrder(buyer){
        try {
            const productos = await CarritoMongo.find({"buyer": buyer});
            const response = await Orders.create({
                orden: productos,
                buyer,
                createdAt: new Date().toLocaleString()
            })
            return response;
        } catch (error) {
            loggerError.log('error', 'Error al guardar una order: ', error.message);
            loggerConsole.log('debug', 'Error al guardar una order: ', error.message)
        }
    }

    async listarOrdenesComprador(buyer){
        try {
            const ordenes = await Orders.find({"buyer": buyer});
            if (ordenes){
                return ordenes;
            }
            else {
                return {message: `No hay órdenes cargadas de ${buyer}`}
            }
        } catch (error) {
            loggerError.log('error', 'Error al listar orders by buyer: ', error.message);
            loggerConsole.log('debug', 'Error al listar orders by buyer: ', error.message)
        }
    }
    
    async listarOrdenes(){
        try {
            const ordenes = await Orders.find({});
            if (ordenes.length !== 0){
                return ordenes;
            }
            else {
                return {message: "No hay órdenes cargadas"}
            }
        } catch (error) {
            loggerError.log('error', 'Error al listar all orders: ', error.message);
            loggerConsole.log('debug', 'Error al listar all orders: ', error.message)

        }
    }
}

module.exports = Mongo;