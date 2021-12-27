const { Schema, model } = require('mongoose');

const tutorSchema = new Schema({
    nombre: String,
    apellido: String,
    direccion: String,
    email: String
}, {
    timestamps: true
});

module.exports = model('Tutor', tutorSchema);