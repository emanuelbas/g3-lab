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

const pruebaHola = async (req, res) => res.send('Hola!')
const getEstudios = async (req, res) => {
    let estudios = await Estudio.find()
        .populate('empleado')
        .populate('paciente')
        .populate('medicoDerivante')
        .populate('tipoDeEstudio')
        .populate('diagnosticoPresuntivo')
    res.status(200).json(estudios)
}
const altaEstudio = async (req, res) => {
 
    // obtener datos
    // const { id_empleado, 
    //     id_medico_derivante, 
    //     id_tipo_de_estudio, 
    //     id_diagnostico_presuntivo, 
    //     detalle_diagnostico, 
    //     id_historial_de_estudio } = req.body;
    console.log("Entre a express, voy a imprimir el req.body")

    console.log(req.body)
    let { EMPLEADO, PACIENTE, MEDICO, TIPO, DIAGNOSTICO, DETALLE, OS} = req.body;
    let ESTADO = '619a630f3a930bb3c59bb779' // Esperando comprobante de pago
    let nuevoEstudio
  
    //Estos ID deberían entrar por req
    // EMPLEADO            = '6189c3d15c81902c73092d3c'
    // PACIENTE            = '619014e2e1950ff9a5607adb'
    // MEDICO            = '616cb0403b41f033cbf7cfa5'
    // TIPO        = "6192464445af8808379e359a"
    // DIAGNOSTICO      = "6192516ac64271a8da78dfd5"
    // DETALLE           = "El paciente tiene acidez al comer ensaladas"

    // Preparo promesas
    const empleado    = User.findById(EMPLEADO)
    const paciente    = User.findById(PACIENTE)
    const medico      = MedicoDerivante.findById(MEDICO)
    const tipoEstudio = TipoDeEstudio.findById(TIPO)
    const dPresuntivo = DiagnosticoPresuntivo.findById(DIAGNOSTICO)
    const estado      = Estado.findById(ESTADO)
    const getObraSocial = ObraSocial.findById(OS)

    // Ejecuto todas a la vez
    Promise.all([empleado, medico, tipoEstudio, dPresuntivo, paciente, estado, getObraSocial])
            .then(async arr => {
                nempleado    = arr[0]
                nmedico      = arr[1]
                ntipoEstudio = arr[2]
                ndPresuntivo = arr[3]
                npaciente    = arr[4]
                nestado      = arr[5]
                nos          = arr[6]

                nuevoEstudio = new Estudio({
                    empleado:nempleado,
                    detalleDelDiagnostico : DETALLE,
                    medicoDerivante:nmedico,
                    paciente:npaciente,
                    tipoDeEstudio:ntipoEstudio,
                    diagnosticoPresuntivo: ndPresuntivo,
                    estado: nestado,
                    obraSocial:nos
                });

                await nuevoEstudio.save()

                return res.status(200).json(nuevoEstudio);
            })
            .catch(err =>{ 
                console.log(err)
                return res.status(401).send(err);
            })
    // Tnedria que dar de alta un registro de historial (con el empleado) y del nuevo estudio (con paciente, med, tipo, diag, detalle)
}
const getEstudio = async (req, res) => {

    // _id en postman se manda como body/raw/JSON
    // en los servicios de angular this.http.get(this.URL + '/detalles-estudio', estudio_id)
    const {_id} = req.headers;
    Estudio.findOne({'_id': _id})
    .populate("paciente")
    .populate('empleado')
    .populate('medicoDerivante')
    .populate('tipoDeEstudio')
    .populate('diagnosticoPresuntivo')
    .populate('obraSocial')
    .populate('estado')
    .populate({
    path: 'historialDeEstudio',
    populate: {path: 'estado'}})
    .populate({
        path: 'historialDeEstudio',
        populate: {path: 'user'}})
    .then((estudio) => {
        console.log(estudio)
        res.status(200).json(
            estudio
        );
    })
    .catch((err)=>{console.log(err)})
}
const changeEstado = async (req, res) => {
 
    //let { estudio, estado } = req.body;
    let { estudio, estado } = req.headers;
    let regEstado;
    await Estado.findOne({'nombre': estado})
    .then(async (est) => {
        
 
        await Estudio.findById(estudio)
        .then((regEstudio) => {
            console.log(est);
            regEstudio.estado = est;
            regEstudio
                .save()
                .then(() => {
                    console.log(regEstudio)
                    return res.status(200).json(regEstudio);
                })
        })
    })
}

module.exports = {
    pruebaHola,
    getEstudios,
    altaEstudio,
    getEstudio,
    changeEstado
    
}