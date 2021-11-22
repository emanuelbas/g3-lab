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
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado'
    },
    obraSocial: {
        type: Schema.Types.ObjectId,
        ref: 'ObraSocial'
    }
}, {
    timestamps: true
});

module.exports = model('Estudio', estudioSchema);