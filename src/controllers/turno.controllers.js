const { Router } = require('express');
const router = Router();
const MedicoDerivante = require('../models/MedicoDerivante');
const User = require('../models/User');
const Estudio = require('../models/Estudio');
const Paciente = require('../models/Paciente');
const TipoDeEstudio = require('../models/TipoDeEstudio');
const DiagnosticoPresuntivo = require('../models/DiagnosticoPresuntivo');
const Empleado = require('../models/Empleado');
const Estado = require('../models/Estado');
const ObraSocial = require('../models/ObraSocial');
const HistorialDeEstudio = require('../models/HistorialDeEstudio');

//
const Turno = require('../models/Turno');

const pruebaTurnos = async (req, res) => {console.log("entre");res.send('Hola!')}

const getTurnos = async (req, res) => {
    console.log("Se ingresa al controlador");
    let fecha = req.params.date

    //Obtener los valores a partir del parametro
    let dd = "12"
    let mm = "12"
    let aaaa = "2021"

    let fechaOrigen = new Date()
    let fechaSiggte = new Date().setDate(fechaOrigen + 1)

    console.log("Se lee la fecha: "+fecha);
    Turno.find({
        fecha : {
            $gte: fechaOrigen,
            $lt: fechaSiggte
        }
    }).then((turnos)=>{
        console.log("@@@ Se leyeron estos turnos @@@")
        console.log(turnos)
        res.send(turnos)
    })

    

}
const tomarTurno = async (req, res) => {



    res.send('respuesta')

}

module.exports ={
    pruebaTurnos,
    getTurnos,
    tomarTurno
}