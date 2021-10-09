const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    email    : String,
    password : String,
    rol      : String
}, {
    timestamps : true
});

module.exports = model('Admin', adminSchema);