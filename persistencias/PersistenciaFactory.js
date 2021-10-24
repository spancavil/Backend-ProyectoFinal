const { loggerError, loggerConsole } = require("../libs/loggerWinston");

//Obtenemos el tipo de persistence desde la configuración
const config = require('../cfg/config');

/**
 * FACTORY de persistencias
 * @constructor type: Qué tipo de objeto se almacenará en la persistencia
 * @method getPersist devuelve el módulo según el constructor
 */

class Factory {
    /**
     * @param type Tipo de objeto a utilizar por la persistencia (Producto, Carrito o Mensaje)
     */
    constructor(type) {
        this.type = type;
        this.persistence = config.PERSISTENCE;
    }
    /**
     * 
     * @returns El módulo seleccionado.
     */
    getPersist() {
        try {
            let modulo = require(process.cwd() + `/persistencias/${this.type}/${this.persistence}`);
            return modulo;
        } catch (e) {
            loggerConsole.log('debug', "Tipo de persistencia no encontrada.", e.message);
            loggerError.log('error', "Tipo de persistencia no encontrada.");
        }
    }
}

module.exports = Factory;