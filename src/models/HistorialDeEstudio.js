const { Schema, model } = require('mongoose');

const historialDeEstudioSchema = new Schema({
    fechaInicio: Date,
    fechaFin: Date,
    estudio: {
        type: Schema.Types.ObjectId,
        ref: 'Estudio'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado'
    }
}, {
    timestamps: true
});

module.exports = model('HistorialDeEstudioSchema', historialDeEstudioSchema);