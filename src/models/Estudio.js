const { Schema, model } = require('mongoose');

const estudioSchema = new Schema({
    detalleDelDiagnostico: String,
    empleado: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    // ctrl k y ctrl u, control c
    // Empleado: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Empleado'
    // },
    // Paciente: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Paciente'
    // },
    // Paciente: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Paciente'
    // }
    // CAMPO ID ESTADO ACTUAL
}, {
    timestamps: true
});

module.exports = model('Estudio', estudioSchema);