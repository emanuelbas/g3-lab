const { Schema, model } = require('mongoose');

const pacienteSchema = new Schema({
    nombre: String,
    apellido: String,
    fechaDeNaciento: Date,
    diagnosticoPresuntivo: String,
    obraSocial: {
        type: Schema.Types.ObjectId,
        ref: 'ObraSocial'
    },
    nomeroDeAfiliado: String,
    telefono: Number
}, {
    timestamps: true
});

module.exports = model('Paciente', pacienteSchema);