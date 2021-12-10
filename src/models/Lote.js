const { Schema, model } = require('mongoose');

const loteSchema = new Schema({
    id        :String,
    numero    :Number,
}, {
    timestamps: true
});

module.exports = model('Lote', loteSchema);