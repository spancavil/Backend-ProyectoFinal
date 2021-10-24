const Ordenes = require ('../../models/Orders');
const Persistencia = require ('../../persistencias/persistenciaCarritoInterface')
const ProductoMongo = require ('../../models/ProductosMongo');
const { loggerError, loggerConsole } = require('../../libs/loggerWinston');

//Connection mongo Atlas (implementable local)
const {ALOJAMIENTO} = require ('../../cfg/config');
require(`../../databases/mongo${ALOJAMIENTO}`);


class Mongo extends Persistencia{
    constructor(){
        super();
    }

    async listar(){
        try {
            const lista = await Ordenes.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay órdenes cargadas"}
            }
        } catch (e) {
            loggerError.log('error',"Error al listar oŕdenes: ", e);
        }
    }
    
    guardar(){
        throw new Error('Método guardar no implementado');
    }

    borrar(){
        throw new Error('Método borrar no implementado');
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
        }
    }

    async borrar(productoId){
        try {
            const response = CarritoMongo.findById(productoId).deleteOne();
            return response;
        } catch (e) {
            loggerError.log('error',"Error al borrar un producto en Mongo: ", e)
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
}

module.exports = Mongo;