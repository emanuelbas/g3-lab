const { Schema, model } = require('mongoose');

console.log("SE EJECUTA ESTUDIO")
const estudioSchema = new Schema({
    detalleDelDiagnostico: String,
    precio: Number,
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
    },
    historialDeEstudio: [{
        type: Schema.Types.ObjectId,
        ref: 'HistorialDeEstudio'
    }],
    comprobantePago: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
});

module.exports = model('Estudio', estudioSchema);