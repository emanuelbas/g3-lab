const { Schema, model } = require('mongoose');

const obraSocialSchema = new Schema({
    nombre: String,
    email: String,
    telefono: Number
}, {
    timestamps: true
});

module.exports = model('ObraSocial', obraSocialSchema);