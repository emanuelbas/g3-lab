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

const Turno = require('../models/Turno');

const pruebaTurnos = async (req, res) => {console.log("entre");res.send('Hola!')}

const getTurnosLibres = async (req, res) => {
    console.log("Se ingresa al controlador");

    let fechaOrigen = new Date(req.params.date)
    fechaOrigen.setHours('09')
    fechaOrigen.setSeconds('00')
    fechaOrigen.setMinutes('00')
    let fechaSig = new Date(req.params.date)
    fechaSig.setHours('09')
    fechaSig.setSeconds('00')
    fechaSig.setMinutes('00')
    fechaSig.setDate(fechaSig.getDate() + 1)
    console.log("Se definieron las fechas origen y sig");
    console.log(new Date(fechaOrigen))

    // Si el día es sabado o domingo que devuelva una lista vacia

    Turno.find({
        fecha : {
            $gte: fechaOrigen,
            $lt: fechaSig
        }
    }).then((turnosOcupados)=>{
        console.log("@@@ Se leyeron estos turnos @@@")
        console.log(turnosOcupados)

        turnosDisponibles = []
        turnoActual = new Date(fechaOrigen)
        for (let h = 9; h < 13; h++) {
            turnoActual.setHours(h)
            for (let m = 0; m <= 45; m+=15) {
                turnoActual.setMinutes(m)
                console.log("@@@@ NUEVO TURNO @@@@");
                nuevoTurno = new Date(turnoActual)
                if (!(turnoEstaOcupado(turnosOcupados, nuevoTurno))) {
                    console.log("Ya que devolvio false voy a pushearlo a la lista");
                    turnosDisponibles.push(nuevoTurno)
                }
            }            
        }
        res.send(turnosDisponibles)
    })
}

const turnoEstaOcupado = (turnosOcupados, nuevoTurno) => {
    res = 'buscar'
    turnosOcupados.forEach(turno => {
        if (turno.fecha.getTime() == nuevoTurno.getTime()){
            console.log("Encontre un turno ocupado, devuelvo true");
            console.log(turno.fecha);
            res = 'encontre'
        }
    });
    return res == 'encontre'
}

const tomarTurno = async (req, res) => {
    
    var { fecha, paciente, estudio } = req.body;

    console.log(fecha + ' ' + paciente + ' ' + estudio);
    fecha = new Date(fecha)
    // Validaciones

    let nuevoTurno = new Turno({ fecha, paciente, estudio });
    console.log(nuevoTurno)

    await nuevoTurno.save()

    res.send('Turno tomado')

}

module.exports = {
    pruebaTurnos,
    getTurnosLibres,
    tomarTurno
}