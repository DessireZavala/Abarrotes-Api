const mongoose = require('mongoose');
const productoSchema = require('../schemas/productoSchema');

const productoModel = mongoose.model('Producto', productoSchema);

module.exports = productoModel;
