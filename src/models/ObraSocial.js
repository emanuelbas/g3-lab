const { Schema, model } = require('mongoose');
console.log("SE EJECUTA OS")
const obraSocialSchema = new Schema({
    nombre: String,
    email: String,
    telefono: Number
}, {
    timestamps: true
});

module.exports = model('ObraSocial', obraSocialSchema);