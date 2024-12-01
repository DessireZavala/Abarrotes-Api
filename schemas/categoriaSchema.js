const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre_categoria: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = categoriaSchema;
