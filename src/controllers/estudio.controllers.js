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
//const multer = require('multer');

const fs = require('fs');


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
const getEstudiosUser = async (req, res) => {
    let userid = req.headers.userid;
    let estudios = await Estudio.find({'paciente':userid})
    .select('detalleDelDiagnostico precio comprobanteFileName cif interpretacionFN fechaTomaMuestra paciente medicoDerivante tipoDeEstudio diagnosticoPresuntivo obraSocial')
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

    let { EMPLEADO, PACIENTE, MEDICO, TIPO, DIAGNOSTICO, DETALLE, OS, PRECIO} = req.body;
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
                    obraSocial:nos,
                    precio : PRECIO
                });

                // Primer historial
                today = new Date()
                nuevoHistorial = new HistorialDeEstudio({
                    fechaInicio: today,
                    fechaFin : today,
                    user : EMPLEADO,
                    estudio: nuevoEstudio._id,
                    estado: '61b4da5831dbd4a9066afce8' //estado con nombre Creado
                });
                await nuevoHistorial.save()

                nuevoEstudio.historialDeEstudio = [nuevoHistorial]

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
    .populate('lote')
    .populate({
    path: 'historialDeEstudio',
    populate: {path: 'estado'}})
    .populate({
        path: 'historialDeEstudio',
        populate: {path: 'user'}})
    .then((estudio) => {
        res.status(200).json(
            estudio
        );
    })
    .catch((err)=>{console.log(err)})
}
const changeEstado = async (req, res) => {

    let { estudio, estado, userid } = req.headers;
    let regEstado;
    await Estado.findOne({'nombre': estado})
    .then(async (est) => {
        
 
        await Estudio.findById(estudio)
        .then((regEstudio) => {
            estadoAnterior = regEstudio.estado
            regEstudio.estado = est;
            regEstudio
                .save()
                .then(async () => {
                    let today = new Date();
                    HistorialDeEstudio.findOne({'estudio':regEstudio},{},{},(err,ultimoHistorial)=>{
                        if (ultimoHistorial) {
                            nuevoHistorial = new HistorialDeEstudio({
                                fechaInicio: ultimoHistorial.fechaFin,
                                fechaFin : today,
                                user : userid,
                                estudio: regEstudio._id,
                                estado: estadoAnterior._id
                            });
                            if (regEstudio.historialDeEstudio) {
                                regEstudio.historialDeEstudio.push(nuevoHistorial)
                                regEstudio.save().then(() => 
                                    nuevoHistorial.save().then(()=>{
                                        return res.status(200).json(regEstudio);
                                    })
                                )
                            } else {
                                regEstudio.historialDeEstudio = [nuevoHistorial]
                                regEstudio.save().then(() => 
                                    nuevoHistorial.save().then(()=>{
                                        return res.status(200).json(regEstudio);
                                    })
                                )
                            }

                        }
                    }).sort('-fechaInicio')
                })
        })
    })
}

const downloadPresupuesto = async (req, res) => {
 
    //let { estudio, estado } = req.body;
    let _id = req.params._id;
    await Estudio.findById(_id)
    .populate("empleado")
    .populate("paciente")
    .populate('medicoDerivante')
    .populate('tipoDeEstudio')
    .populate('diagnosticoPresuntivo')
    .populate('obraSocial')
    .then((estudio) => {
        let filename = "Presupuesto_" + estudio.paciente.email + ".txt"
        let cabecera  = "PRESUPUESTO PARA ESTUDIO. LABORATORIO G3LAB"
        let cuerpo    = 
        "Estudio solicitado por " + estudio.medicoDerivante.email + " de tipo " + estudio.tipoDeEstudio.nombre
        let precio    = "Precio: $" + estudio.precio
        let backline  = '\n'
        let codigo    = "Realizar depósito en cuenta alias G3.LAB.2021"

        let documento = cabecera + backline + backline + cuerpo + backline + precio + backline + backline + codigo
        res.set({
        'Content-Disposition': 'attachment; filename=' + filename ,
        'Content-type': 'text/csv'}); 
        res.send(documento);
        //var text={"hello.txt":"Hello World!","bye.txt":"Goodbye Cruel World!"};

        //res.set({'Content-Disposition': 'attachment; filename=\"2015.csv\"','Content-type': 'text/csv'});
        //res.send(text["hello.txt"]);
    })
}


const downloadConsentimiento = async (req, res) => {
 
    let _id = req.params._id;
    await Estudio.findById(_id)
    .populate("empleado")
    .populate("paciente")
    .populate('medicoDerivante')
    .populate('tipoDeEstudio')
    .populate('diagnosticoPresuntivo')
    .populate('obraSocial')
    .then((estudio) => {
        let filename = "Consentimiento_informado_" + estudio.paciente.email + ".txt"
        let cabecera  = "CONSENTIMIENTO INFORMADO. LABORATORIO G3LAB          " + new Date().toLocaleString()
        let cuerpo    = 
        "Estudio solicitado por " + estudio.medicoDerivante.email + " de tipo " + estudio.tipoDeEstudio.nombre
        let backline  = '\n'
        let rayita = "___________________________________________________"
        let firmayaclaracion = "                         FIRMA Y ACLARACION"

        let documento = cabecera + backline + backline + cuerpo + backline + backline + rayita + backline + firmayaclaracion
        res.set({
        'Content-Disposition': 'attachment; filename=' + filename ,
        'Content-type': 'text/csv'}); 
        res.send(documento);
    })
}


const downloadComprobante = async (req, res) => {

    //let { estudio, estado } = req.body;
    let _id = req.params._id;
    await Estudio.findById(_id)
    .then((estudio) => {
        let path = '/uploads/'
        let filename = estudio.comprobanteFilname

        let documento = "Deberia descargar el comprobante de pago con el nombre "+estudio.filename
        res.set({
        'Content-Disposition': 'attachment; filename=' + filename ,
        'Content-type': 'text/csv'}); 
        res.send(documento);

    })
}

const getAll=(req, res) =>{

    let estudioName = new RegExp(`..*${req.query.searchBy || ''}.*`)
    Estudio.find({empleado:estudioName})
        .populate('detalleDelDiagnostico')
        .exec()//
        .then( (estudio) => res.end(estudio))
        .catch(
            (error) =>{
                res.status(500).send({
                    message:error.mesage
                })
            }
        )

}

const estudiosPorEstado = async (req, res) => {
    contadores = []

    await Estado.find().then((estado)=>{
        // Inicializar contadores
        for (var i = 0; i < estado.length; i++) {
            contadores.push({
                "name" :estado[i].nombre,
                "value" : 0
            })
         }
         Estudio.find().populate('estado').then((estudios) => {
            // Se recorren todos los estudios
            for (var i = 0; i < estudios.length; i++) {
                nombreEstadoActual = estudios[i].estado.nombre
                agregado = 0
                let j = 0
                // Se incrementa busca el estado que coincida con el del estudio y se incrementa
                while (!(agregado)) {
                    if (contadores[j].name === nombreEstadoActual) {
                        contadores[j].value++
                        agregado = 1
                    }
                    j++
                }
             }
             res.status(200).send(contadores)
        })
    })
    
}

const promedioDuracionEstudioPorAño = async (req, res) => {

    // Seleccionar solo finalizados
    Estudio.find().sort([['createdAt', 'ascending']]).then((estudios) => {

        ganancias = []
        anoActual = String(estudios[0].createdAt.getFullYear())
        mesActual = String(estudios[0].createdAt.getMonth())
        anoObtenido = anoActual
        mesObtenido = mesActual
        acumMes = 0
        listaDeMeses = []
        listaDeAnos = []
        cantMes = 0

        for (var i = 0; i < estudios.length; i++) {
            createdAt = estudios[i].createdAt

            anoObtenido = String(createdAt.getFullYear())
            mesObtenido = String(createdAt.getMonth())

            if (mesObtenido == mesActual && anoActual == anoObtenido){
                 // Tiempo que llevó el estudio si es que está finalizado
                if (estudios[i].precio){
                    acumMes += estudios[i].precio
                    cantMes++
                }
            } 
            else {
                if (anoObtenido != anoActual){
                    // Cambio de año

                    // Pusheo
                    listaDeMeses.push({
                        "name" : mesActual,
                        "value" : acumMes
                    })
                    listaDeAnos.push({
                        "name" : anoActual,
                        "series" : listaDeMeses
                    })

                    // Inicio variables
                    listaDeMeses = []
                    acumMes = 0 // Tiempo que llevo el estudio
                    cantMes = 0
                    if (estudios[i].precio){
                        acumMes += estudios[i].precio
                        cantMes++
                    }
                    anoActual = anoObtenido
                    mesActual = mesObtenido
                } else {
                    // En este caso cambio de mes pero no de año

                    listaDeMeses.push({
                        "name" : mesActual,
                        "value" : acumMes
                    })
                    acumMes = 0 // Tiempo que llevo el estudio
                    cantMes = 0
                    if (estudios[i].precio){
                        acumMes += estudios[i].precio
                        cantMes++
                    }
                    mesActual = mesObtenido
                }
            }
        } // Fin del for cada estudio
        // Terminó el for, hay que pushear el ultimo mes/año
        listaDeMeses.push({
            "name" : mesActual,
            "value" : acumMes
        })
        listaDeAnos.push({
            "name" : anoActual,
            "series" : listaDeMeses
        })

        return res.status(200).json(listaDeAnos);

    }) // Estudios mongoose
}

const registraTomaMuestra = async (req, res) => {
    const { idestudio, cantmililitosextraidos, numerofrizer } = req.headers;
    if (cantmililitosextraidos >= 5 && cantmililitosextraidos <= 12.5 ) {
        Estudio.findById(idestudio).then(async (estudio)=>{
            estudio.cantMililitosExtraidos = cantmililitosextraidos
            estudio.numeroFrizer = numerofrizer
            await estudio.save()
            return res.status(200).json(estudio);
        })
    } else {
        return res.status(400).json({});
    }
}

const gananciasMensuales = async (req, res) => {
    Estudio.find().sort([['createdAt', 'ascending']]).then((estudios) => {

        ganancias = []
        mesActual = String(estudios[0].createdAt.getMonth() + 1).padStart(2, '0')+"/"+estudios[0].createdAt.getFullYear()
        acum = 0
        for (var i = 0; i < estudios.length; i++) {
            createdAt = estudios[i].createdAt
            mesObtenido = String(createdAt.getMonth() + 1).padStart(2, '0')+"/"+createdAt.getFullYear()
            gananciaObtenida = estudios[i].precio

            if (mesObtenido == mesActual){
                acum += gananciaObtenida
            } else {
                // Guardo el mes anterior
                ganancias.push({
                    "name" : mesActual,
                    "value" : acum
                })
                // Inicio el nuevo mes
                acum = 0
                mesActual = mesObtenido
            }
        }
        ganancias.push({
            "name" : mesActual,
            "value" : acum
        })

        respuesta = 
        [{
            "name" : "Ingresos",
            "series" : ganancias
        }]

        return res.status(200).json(respuesta);
      });
}

module.exports = {
    pruebaHola,
    getEstudios,
    altaEstudio,
    getEstudio,
    changeEstado,
    downloadPresupuesto,
    getAll,
    estudiosPorEstado,
    gananciasMensuales,
    promedioDuracionEstudioPorAño,
    downloadComprobante,
    downloadConsentimiento,
    registraTomaMuestra,
    getEstudiosUser
    
}