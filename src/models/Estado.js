const { Schema, model } = require('mongoose');
console.log("SE EJECUTA ESTADO")
const estadoSchema = new Schema({
    id        :String,
    nombre    :String,
}, {
    timestamps: true
});

module.exports = model('Estado', estadoSchema);