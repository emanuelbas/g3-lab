const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const MedicoDerivante = require('../models/MedicoDerivante');
const User = require('../models/User');
const Estudio = require('../models/Estudio');
const Paciente = require('../models/Paciente');
const TipoDeEstudio = require('../models/TipoDeEstudio');
const DiagnosticoPresuntivo = require('../models/DiagnosticoPresuntivo');
const Empleado = require('../models/Empleado');

router.post('/registrar', async (req, res) => {
    const { email, password, rol } = req.body;
    console.log(email, password)
    const nuevoUsuario = new User({ email, password, rol });
    await nuevoUsuario.save();

    const token = jwt.sign({ _id: nuevoUsuario._id }, 'secretKey')
    res.status(200).json({ token })

})




// GETTERS

router.get('/obtener-medico-derivante', async (req, res) => {
    let medicosDerivantes = await MedicoDerivante.find({'status': true})
    res.status(200).json(medicosDerivantes)
})
router.get('/obtener-empleados', async (req, res) => {
    let empleados = await User.find({'rol': 'Empleado'})
    res.status(200).json(empleados)
})
router.get('/obtener-pacientes', async (req, res) => {
    let pacientes = await User.find({'rol': 'Paciente'})
    res.status(200).json(pacientes)
})
router.get('/obtener-tipos-de-estudio', async (req, res) => {
    let tipos = await TipoDeEstudio.find()
    res.status(200).json(tipos)
})
router.get('/obtener-diagnosticos-presuntivos', async (req, res) => {
    let diagnosticos = await DiagnosticoPresuntivo.find()
    res.status(200).json(diagnosticos)
})
router.get('/obtener-estudios', async (req, res) => {
    let estudios = await Estudio.find()
        .populate('empleado')
        .populate('paciente')
        .populate('medicoDerivante')
        .populate('tipoDeEstudio')
        .populate('diagnosticoPresuntivo')
    res.status(200).json(estudios)
})
// GETTERS //


// S1R02 - I
router.post('/alta-empleado', async (req, res) => {
    const { email, password, name, surname, phone } = req.body;

    //una ves que tenga los datos, crear empleado
    //crear usuario
    //relacionar empleado
    const registroEmpleado = new Empleado({name, surname, phone})
    const nuevoUsuario = new User({ email, "password":"1234", "rol":"Empleado", "empleado":registroEmpleado._id });

    await registroEmpleado.save();
    await nuevoUsuario.save();
    

    //const token = jwt.sign({ _id: nuevoUsuario._id }, 'secretKey')
    res.status(200).json({})

})

// S1R03 - I

router.get('/obtener-medico-por-id', async (req, res) => {
  const {id} = req.headers
  let medicoDerivantes = await MedicoDerivante.find({'_id': id})
  res.status(200).json(medicoDerivantes)

})

router.post('/alta-medico-derivante', async (req, res) => {
    const {name, surname, email, phone, _id} = req.body;
    const newMedicoDerivante = new MedicoDerivante({name, surname, email, phone, _id, status:true});
    await newMedicoDerivante.save().then(()=>res.status(200).send({status:"OK"}))    

})

router.patch('/baja-medico-derivante', async (req, res) => {
    const {_id} = req.body;
    await MedicoDerivante.findById(_id)
    .then((medDerivante) => {
        medDerivante.status = false;
        medDerivante
            .save()
            .then(() => {
             res.json({ medDerivante }); // return new status
            })
    })
    .catch((err) => {
        return res.status(401).send("El médico no existe");
    });
})

router.patch('/editar-medico-derivante', async (req, res) => {
    console.log(req.body)
    const {_id} = req.body;
    console.log("ID:_:",_id)
    await MedicoDerivante.findById(_id)
    .then((medDerivante) => {
        let {name, surname, email, phone} = req.body;
        
        let newMedDerivante = {_id, name, surname, email, phone, 'status':true}
        console.log("newMedDerivante",newMedDerivante)
        medDerivante = Object.assign(medDerivante, newMedDerivante)
        /* console.log("#####", medDerivante) */
        medDerivante
            .save()
            .then(() => {
             res.json({ medDerivante }); // return new status
            })
    })
    .catch((err) => {
        return res.status(401).send("El médico no existe");
    });
})
// S1R03 - F

// S1R01 - I
router.post('/registrar-admin', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    rol = 'Admin';
    const nuevoUsuario = new Admin({ email, password, rol });
    await nuevoUsuario.save();

    const token = jwt.sign({ _id: nuevoUsuario._id }, 'secretKey')
    res.status(200).json({ token })

})

router.post('/ingresar-admin', async (req, res) => {

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email })

    if (!admin) return res.status(401).send("El correo no existe");
    if (admin.password !== password) return res.status(401).send('Password incorrecta');

    const token = jwt.sign({ _id: admin._id }, 'secretKey');
    return res.status(200).json({ token });
})


// Shift + Alt + A
/* router.post('/ingresar', async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email})

    if (!user) return res.status(401).send("El correo no existe");
    if (user.password !== password) return res.status(401).send('Password incorrecta');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token});
}) */

router.post('/ingresar', async (req, res) => {

    const { email, password } = req.body;

    let user = await User.findOne({ email })

    if (!user) {
        user = await Admin.findOne({ email })
    }
    if (!user) {
        return res.status(401).send("El correo no existe");
    }
    if (user.password !== password) return res.status(401).send('Password incorrecta');

    const token = jwt.sign({ _id: user._id }, 'secretKey');
    const rol = user.rol;
    return res.status(200).json({ token, rol });
})
// S1R01 - F



router.get('/tareas', (re, res) => {
    res.json([
        {
            _id: 1,
            name: 'tarea 1',
            descripcion: 'lorem imsum',
            date: '2021-09-12T08:20:00.043+00:00'
        },
        {
            _id: 2,
            name: 'tarea 2',
            descripcion: 'lorem imsum',
            date: '2021-09-12T08:20:00.043+00:00'
        },
        {
            _id: 3,
            name: 'tarea 3',
            descripcion: 'lorem imsum',
            date: '2021-09-12T08:20:00.043+00:00'
        },
    ]);


});

router.get('/tareas-privadas', verifyToken, (re, res) => {
    res.json([
        {
            _id: 1,
            name: 'tarea 1',
            descripcion: 'lorem imsum',
            date: '2021-09-12T08:20:00.043+00:00'
        },
        {
            _id: 2,
            name: 'tarea 2',
            descripcion: 'lorem imsum',
            date: '2021-09-12T08:20:00.043+00:00'
        },
        {
            _id: 3,
            name: 'tarea 3',
            descripcion: 'lorem imsum',
            date: '2021-09-12T08:20:00.043+00:00'
        },
    ]);
});

// R22 - I
//verifyToken
router.post('/alta-estudio', async (req, res) => {
 
    // obtener datos
    // const { id_empleado, 
    //     id_medico_derivante, 
    //     id_tipo_de_estudio, 
    //     id_diagnostico_presuntivo, 
    //     detalle_diagnostico, 
    //     id_historial_de_estudio } = req.body;
    console.log("Entre a express, voy a imprimir el req.body")

    console.log(req.body)
    let { EMPLEADO, PACIENTE, MEDICO, TIPO, DIAGNOSTICO, DETALLE} = req.body;
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

    // Ejecuto todas a la vez
    Promise.all([empleado, medico, tipoEstudio, dPresuntivo, paciente])
            .then(async arr => {
                nempleado    = arr[0]
                nmedico      = arr[1]
                ntipoEstudio = arr[2]
                ndPresuntivo = arr[3]
                npaciente    = arr[4]

                nuevoEstudio = new Estudio({
                    empleado:nempleado,
                    detalleDelDiagnostico : DETALLE,
                    medicoDerivante:nmedico,
                    paciente:npaciente,
                    tipoDeEstudio:ntipoEstudio,
                    diagnosticoPresuntivo: ndPresuntivo
                });

                await nuevoEstudio.save()
                return res.status(200).json(nuevoEstudio);
            })
            .catch(err =>{ 
                console.log(err)
                return res.status(401).send("El empleado no existe");
            })
    // Tnedria que dar de alta un registro de historial (con el empleado) y del nuevo estudio (con paciente, med, tipo, diag, detalle)
}

);

// Mock de lista de estudios

router.get('/lista-de-estudios', (req, res) => {
    res.json([
        {
            _id: 1,
            nombre_paciente: 'jose alberti',
            nombre_medico_derivante: 'pepito',
            nombre_tipo_estudio: 'un tipo',
            diagnostico_presuntivo: 'dasasdasd',
            detalle_diagnostico: 'un detalle de diagnostico',
            estado_actual: 'estado',
            historial: 'aca necesito un array',
        },
        {
            _id: 2,
            nombre_paciente: 'jose alberti',
            nombre_medico_derivante: 'pepito',
            nombre_tipo_estudio: 'un tipo',
            diagnostico_presuntivo: 'dasasdasd',
            detalle_diagnostico: 'un detalle de diagnostico',
            estado_actual: 'estado',
            historial: 'aca necesito un array',
        },
        {
            _id: 3,
            nombre_paciente: 'jose alberti',
            nombre_medico_derivante: 'pepito',
            nombre_tipo_estudio: 'un tipo',
            diagnostico_presuntivo: 'dasasdasd',
            detalle_diagnostico: 'un detalle de diagnostico',
            estado_actual: 'estado',
            historial: 'aca necesito un array',
        },
        
    ]);
})

// router.get('/obtener-medico-por-id', async (req, res) => {
//     const {id} = req.headers
//     let medicoDerivantes = await MedicoDerivante.find({'_id': id})
//     res.status(200).json(medicoDerivantes)
  
//   })

// Carga diagnosticos
router.post('/carga-diagnosticos-presuntivos', async (req, res) => {
    //Recibe una lista de patologias separadas por enter y las carga en Mongo
    //const { patologias } = req.body;

    patologias = 
`hardodear
las patologias
aqui`

    patologias = patologias.split("\n");

    DiagnosticoPresuntivo.collection.drop();
    for (var i = 0; i < patologias.length; i++) {
        let diagnosticoNuevo = new DiagnosticoPresuntivo({ "nombre" : patologias[i] });
        console.log(diagnosticoNuevo)
        await diagnosticoNuevo.save();
    }
    return true
})

// Carga diagnosticos

router.get('/obtener-estudio', async (req, res) => {

    // _id en postman se manda como body/raw/JSON
    // en los servicios de angular this.http.get(this.URL + '/detalles-estudio', estudio_id)
    const {_id} = req.headers;
    Estudio.findOne({'_id': _id})
    .populate("paciente")
    .populate('empleado')
    .populate('medicoDerivante')
    .populate('tipoDeEstudio')
    .populate('diagnosticoPresuntivo')
    .then((estudio) => {
        console.log(estudio)
        res.status(200).json(
            estudio
        );
    })
    .catch((err)=>{console.log(err)})

})


// R22 - F

router.get('/perfil', verifyToken, (req, res) => {
    res.send(req.userId);
})

router.get('/', (req, res) => res.send('Hola!'))

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Solicitud no autorizada')
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Solicitud no autorizada');
    }

    const payload = jwt.verify(token, 'secretKey');

    req.userId = payload._id;
    next();

}