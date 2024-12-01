const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
    nombre_marca: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = marcaSchema;
