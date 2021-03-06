const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    obraSocial: {
        type: Schema.Types.ObjectId,
        ref: 'ObraSocial'
    },
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado'
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente'
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor'
    },
    rol: String //Puede ser: Admin, Empleado, Configurador, Paciente
}, {
    timestamps: true
});

module.exports = model('User', userSchema);