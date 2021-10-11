const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    obraSocial: {
        type: Schema.Types.ObjectId,
        ref: 'ObraSocial'
    },
    Empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado'
    },
    Paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente'
    },
    rol: String //Puede ser: Admin, Empleado, Configurador, Paciente
}, {
    timestamps: true
});

module.exports = model('User', userSchema);