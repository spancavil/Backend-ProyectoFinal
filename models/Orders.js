var mongoose = require('mongoose');
const productosMongo = require('./ProductosMongo');

//Creamos un esquema de orden que corresponde a un array de esquema de roductos
const schema = mongoose.Schema({
    orden: [productosMongo]
});

const Users = mongoose.model('Users', schema);

module.exports = Users;