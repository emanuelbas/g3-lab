const { Schema, model } = require('mongoose');

const estudioSchema = new Schema({
    detalleDelDiagnostico: String,
    precio: Number,
    comprobanteFileName : String,
    cif : String,
    cantMililitosExtraidos : Number,
    numeroFrizer : Number,
    interpretacionFN : String,
    // Si se pasa de esta fecha sin tomarse la muestra se vuelve a Esperando seleccion de turno
    fechaTomaMuestra : Date, 
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
    },
    lote: {
        type: Schema.Types.ObjectId,
        ref: 'Lote'
    }
}, {
    timestamps: true
});

module.exports = model('Estudio', estudioSchema);