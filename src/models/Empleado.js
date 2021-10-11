const { Schema, model } = require('mongoose');

const empleadoSchema = new Schema({
    nombre: String,
    apellido: String,
    telefono: Number
}, {
    timestamps: true
});

module.exports = model('Empleado', empleadoSchema);