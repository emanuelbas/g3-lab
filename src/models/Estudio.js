const { Schema, model } = require('mongoose');

const estudioSchema = new Schema({
    detalleDelDiagnostico: String,
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
//    ctrl k y ctrl u, control c
    medicoDerivante: {
        type: Schema.Types.ObjectId,
        ref: 'MedicoDerivante'
    },
    tipoDeEstudio: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDeEstudio'
    },
    diagnosticoPresuntivo: {
        type: Schema.Types.ObjectId,
        ref: 'DiagnosticoPresuntivo'
    }
    // CAMPO ID ESTADO ACTUAL
}, {
    timestamps: true
});

module.exports = model('Estudio', estudioSchema);