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

    guardarOrder(buyer){
        throw new Error('Método guardarOrder no implementado');
    }

    listarOrdenesComprador(buer){
        throw new Error('Método listar órdenes de comprador no implementado');
    }
    
    listarOrdenes(){
        throw new Error('Método listar todas las órdenes no implementado');
    }
}

module.exports = CarritoI;