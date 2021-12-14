const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
    fecha    :Number,
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    estudio: {
        type: Schema.Types.ObjectId,
        ref: 'Estudio'
    }
}, {
    timestamps: true
});

module.exports = model('Turno', turnoSchema);