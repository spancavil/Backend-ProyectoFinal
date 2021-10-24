const { loggerError, loggerConsole } = require('../libs/loggerWinston');
const Persistencia = require ('../persistencias/PersistenciaFactory');
const persistencia = new Persistencia("Carrito");

const instance = new (persistencia.getPersist());

class Carrito {
    constructor (){
    }

    async listar(){
        try {
            console.log (instance);
            const response = await instance.listar();
            if (response){
                return response;
            }
            else {
                return {message: "No hay productos cargados en el carrito"}
            }
        } catch (error) {
            loggerError.log('error',"Error al listar el carrito: ", error.message);
            loggerConsole.log('debug', "Error al listar el carrito: ", error.message)

        }
    }

    
    async listarId(productoId){
        try {
            const response = await instance.listarId(productoId);
            if (response){
                return response;
            }
            else {
                return {message: "No hay productos cargados en el carrito con ese id"}
            }
        } catch (error) {
            loggerError.log('error', "Error al listar un id en carrito: ", error.message);
            loggerConsole.log('debug', "Error al listar un id en carrito: ", error.message)

        }
    }

    async guardar(productoId, username){
        try {
            const response = await instance.guardar(productoId, username);
            return response;
        } catch (error) {
            loggerError.log('error',"Error al guardar un producto en el carrito: ", error.message)
            loggerConsole.log('debug',"Error al guardar un producto en el carrito: ", error.message)
        }
    }

    async borrar(productoId){
        try{
            const response = await instance.borrar(productoId);
            return response;
        } catch (error) {
            loggerError.log('error',"Error al borrar un producto en el carrito: ", error.message)
            loggerConsole.log('debug',"Error al borrar un producto en el carrito: ", error.message)
        }
    }

    
    async borrarCarrito(buyer){
        try {
            const response = await instance.borrarCarrito(buyer);
            return response;
        } catch (error) {
            loggerError.log('error', 'Error al borrar los productos del carrito de', buyer);
            loggerConsole.log('debug','Error al borrar los productos del carrito de', buyer)
        }
    }

    async guardarOrder(buyer){
        try {
            const response = await instance.guardarOrder(buyer);
            return response;
            
        } catch (error) {
            loggerError.log('error', 'Error al guardar una order: ', error.message);
            loggerConsole.log('debug', 'Error al guardar una order: ', error.message)

        }
    }

    async listarOrdenesComprador(buyer){
        try {
            const response = await instance.listarOrdenesComprador(buyer);
            return response
        } catch (error) {
            loggerError.log('error', 'Error al listar orders by buyer: ', error.message);
            loggerConsole.log('debug', 'Error al listar orders by buyer: ', error.message)

        }
    }
    
    async listarOrdenes(){
        try {
            const response = await instance.listarOrdenes();
            return response;
        } catch (error) {
            loggerError.log('error', 'Error al listar all orders: ', error.message);
            loggerConsole.log('debug', 'Error al listar all orders: ', error.message)

        }
    }

}

module.exports = Carrito;