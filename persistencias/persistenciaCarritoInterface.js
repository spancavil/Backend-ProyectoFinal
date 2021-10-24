class CarritoI {
    constructor(){}

    listar(){
        throw new Error('Método listar no implementado');
    }

    listarID(){
        throw new Error('Método listarId no implementado');
    }

    guardar(){
        throw new Error('Método guardar no implementado');
    }

    borrar(){
        throw new Error('Método borrar no implementado');
    }

    borrarCarrito(){
        throw new Error('Método borrar carrito no implementado');
    }
}

module.exports = CarritoI;