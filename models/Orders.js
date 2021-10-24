var mongoose = require('mongoose');

//Creamos un esquema de orden que corresponde a un array de esquema de roductos
const schema = mongoose.Schema({
    orden: Array,
    buyer: String,
    createdAt: String,
});

const Orders = mongoose.model('Orders', schema);

module.exports = Orders;