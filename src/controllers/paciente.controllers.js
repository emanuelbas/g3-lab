const { Router } = require('express');
const router = Router();
const MedicoDerivante = require('../models/MedicoDerivante');
const User = require('../models/User');
const Estudio = require('../models/Estudio');
const Paciente = require('../models/Paciente');
const TipoDeEstudio = require('../models/TipoDeEstudio');
const DiagnosticoPresuntivo = require('../models/DiagnosticoPresuntivo');
const Empleado = require('../models/Empleado');
const Tutor = require('../models/Tutor');
const Estado = require('../models/Estado');
const ObraSocial = require('../models/ObraSocial');
const HistorialDeEstudio = require('../models/HistorialDeEstudio');

const getPacientes = async (req, res) => {
    let pacientes = await User.find({'rol':'Paciente'})
        .populate('obraSocial')
    res.status(200).json(pacientes)
}

const pruebaPacientes = async (req, res) => {
    res.status(200).json({"ok":"yes"})
}

// Estos son los datos del documento Paciente
// nombre: String,
// apellido: String,
// fechaDeNaciento: Date,
// obraSocial: {
//     type: Schema.Types.ObjectId,
//     ref: 'ObraSocial'
// },
// nomeroDeAfiliado: String,
// telefono: Number,
// direccion: String,
// email: String

// Estos son los datos del documento Tutor 
// nombre: String,
// apellido: String,
// direccion: String,
// email: String

const autoregistro = async (req, res) => {

    const { fechanac, dni, password, name, surname, phone, direccion, email, nombretutor, apellidotutor, direcciontutor, emailtutor } = req.body;
    console.log("Se imprimen todos los datos que entraron");
    console.log(fechanac, dni, password, name, surname, phone, direccion, email, nombretutor, apellidotutor, direcciontutor, emailtutor)
    return res.status(200).json({})

    if (nombretutor) {
        let nuevoTutor = new Tutor({
            "nombre" : nombretutor,
            "apellido": apellidotutor,
            "direccion" : direcciontutor,
            "email" : emailtutor,
        })
    }
    let nuevoPaciente = new Paciente({
        nombre: name,
        apellido: surname,
        fechaDeNaciento: new Date(fechanac),
        obraSocial: '61c9192449a0fa4ff14d08b9', //Sin OS
        nomeroDeAfiliado: '0',
    })
    if (phone) {
        nuevoPaciente.telefono = phone
        nuevoPaciente.direccion = direccion
        nuevoPaciente.email = email
    }

    let registroEmpleado = new Empleado({name, surname, phone})
    let nuevoUsuario = new User({ 
        "email": dni,
        "password":password, 
        "rol":"Paciente", 
        "obraSocial" : '61c9192449a0fa4ff14d08b9',
    });
    if (nuevoTutor){
        nuevoUsuario.tutor = nuevoTutor
    }
    nuevoUsuario.empleado = nuevoPaciente

    console.log("Ahora se deberian guardar estos registros");
    console.log(nuevoPaciente);
    console.log(nuevoUsuario);
    console.log(nuevoTutor);
    // await nuevoPaciente.save();
    // await nuevoUsuario.save();
    // await nuevoTutor.save();
    

    //const token = jwt.sign({ _id: nuevoUsuario._id }, 'secretKey')
    res.status(200).json({})
}

module.exports = {
   
    getPacientes,
    autoregistro,
    pruebaPacientes
}

