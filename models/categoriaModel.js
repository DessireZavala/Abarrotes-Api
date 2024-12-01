const mongoose = require('mongoose');
const categoriaSchema = require('../schemas/categoriaSchema');

const categoriaModel = mongoose.model('Categoria', categoriaSchema);

module.exports = categoriaModel;
