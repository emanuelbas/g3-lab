const { Schema, model } = require('mongoose');

const loteSchema = new Schema({
    estado: String,
    cantEstudios : Number,
    estudios: [{
        type: Schema.Types.ObjectId,
        ref: 'Estudio'
    }]
}, {
    timestamps: true
});

module.exports = model('Lote', loteSchema);