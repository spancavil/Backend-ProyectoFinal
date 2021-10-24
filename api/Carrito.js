const { loggerError } = require('../libs/loggerWinston');
const Persistencia = require ('../persistencias/PersistenciaFactory');
const persistencia = new Persistencia("Carrito");
const instance = new(persistencia.getPersist());

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
            loggerError.log('error',"Error al listar el carrito: ", e);
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
            loggerError.log('error', "Error al listar un id en carrito: ", e);
        }
    }

    async guardar(productoId, username){
        try {
            const response = await instance.guardar(productoId, username);
            return response;
        } catch (e) {
            loggerError.log('error',"Error al guardar un producto en el carrito: ", e)
        }
    }

    async borrar(productoId){
        try{
            const response = await instance.borrar(productoId);
            return response;
        } catch (e) {
            loggerError.log('error',"Error al borrar un producto en el carrito: ", e)
        }
    }

    async borrarCarrito(buyer){
        try {
            const response = await instance.borrarCarrito(buyer);
            return response;
        } catch (error) {
            loggerError.log('error', 'Error al borrar los productos del carrito de', buyer)
        }
    }

}

module.exports = Carrito;