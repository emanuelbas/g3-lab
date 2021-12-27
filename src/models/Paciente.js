const { Schema, model } = require('mongoose');

const pacienteSchema = new Schema({
    nombre: String,
    apellido: String,
    fechaDeNaciento: Date,
    obraSocial: {
        type: Schema.Types.ObjectId,
        ref: 'ObraSocial'
    },
    nomeroDeAfiliado: String,
    telefono: Number,
    direccion: String,
    email: String
}, {
    timestamps: true
});

module.exports = model('Paciente', pacienteSchema);