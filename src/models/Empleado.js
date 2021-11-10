const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id        :String,
    email     :String,
    name      :String,
    surname   :String,
    phone     :Number
}, {
    timestamps: true
});

module.exports = model('Empleado', userSchema);