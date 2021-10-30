const { Schema, model } = require('mongoose');

const diagnosticoPresuntivoSchema = new Schema({
    nombre: String
}, {
    timestamps: true
});

module.exports = model('DiagnosticoPresuntivo', diagnosticoPresuntivoSchema);