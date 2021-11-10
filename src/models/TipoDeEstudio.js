const { Schema, model } = require('mongoose');

const tipoDeEstudioSchema = new Schema({
    nombre: String
}, {
    timestamps: true
});

module.exports = model('TipoDeEstudio', tipoDeEstudioSchema);