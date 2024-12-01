// Importación de los modelos
const categoriaModel = require('./categoriaModel');
const marcaModel = require('./marcaModel');
const productoModel = require('./productoModel');

// Exportación de los modelos para usarlos en otras partes del proyecto
module.exports = {
    categoriaModel,
    marcaModel,
    productoModel
};
