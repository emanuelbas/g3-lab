const { Schema, model } = require('mongoose');

const historialDeEstudioSchema = new Schema({
    fechaInicio: Date,
    fechaFin: Date,
    Estudio: {
        type: Schema.Types.ObjectId,
        ref: 'Estudio'
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = model('HistorialDeEstudioSchema', historialDeEstudioSchema);