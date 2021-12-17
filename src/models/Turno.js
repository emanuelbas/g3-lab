const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
    fecha    :Date,
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