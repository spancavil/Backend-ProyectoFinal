const ProductosMongo = require("../../models/ProductosMongo");
const ProductoI = require("../persistenciaProductosInterface");
const { loggerError, loggerConsole } = require("../../libs/loggerWinston");

//Connection mongo Atlas (implementable local)
const {ALOJAMIENTO} = require ('../../cfg/config');
require(`../../databases/mongo${ALOJAMIENTO}`);

class Mongo extends ProductoI {
    constructor(){
        super();
    }

    async listarId(productoId){
        try {
            const producto = await ProductosMongo.findById(productoId);
            if (producto){
                return producto;
            }
            else {
                return {message: "No hay producto cargado con ese id"};
            }
        } catch (e) {
            loggerError.log('error', "Error al listar por id en Mongo: ", e);
            loggerConsole.log('debug', "Error al listar por id en Mongo: ", e);

        }

    }

    async listar(){
        try {
            const lista = await ProductosMongo.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay productos cargados"}
            }
        } catch (e) {
            loggerError.log('error', "Error al leer los mensajes: ", e);
            loggerConsole.log('debug', "Error al leer los mensajes: ", e);
        }
    }

    async guardar(producto){
        try {
            const response = await ProductosMongo.create(producto);
            return response;
        } catch (e) {
            loggerError.log('error', 'Error al guardar en Mongo: ', e);
            loggerConsole.log('error', 'Error al guardar en Mongo: ', e);
        }
    }

    async actualizar(productoId, producto){
        try {
            const response = await ProductosMongo.findByIdAndUpdate(productoId, producto);
            if (response !== null){
                return {message: "Producto actualizado!"}
            } else{
                return {message: "No se encontró producto con dicho id"};
            }
        } catch (error) {
            loggerError.log('error', "Error al actualizar un producto en Mongo: ", e)
            loggerConsole.log('debug', "Error al actualizar un producto en Mongo: ", e)
        }
    }

    async borrar(productoId){
        try {
            const response = ProductosMongo.findByIdAndDelete(productoId);
            if (response){
                return {message: "Producto con id" + productoId + " borrado."}
            }
            return {message: "Producto no encontrado."};
        } catch (e) {
            loggerError.log('error', "Error al borrar un producto en Mongo: ", e)
            loggerConsole.log('error', "Error al borrar un producto en Mongo: ", e)
        }
    }

}

module.exports = Mongo;