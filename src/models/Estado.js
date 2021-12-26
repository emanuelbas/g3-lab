const { Schema, model } = require('mongoose');

const estadoSchema = new Schema({
    id        :String,
    nombre    :String,
    nombrePublico : String
}, {
    timestamps: true
});

module.exports = model('Estado', estadoSchema);