const mongoose = require('mongoose');
const marcaSchema = require('../schemas/marcaSchema');

const marcaModel = mongoose.model('Marca', marcaSchema);

module.exports = marcaModel;
