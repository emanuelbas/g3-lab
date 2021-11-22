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



// R22 - I
//verifyToken



// Logica de lotes
                // Contador es 0?
                // Si es 0 --> Crear un nuevo lote
                    // Agregar estudio a lote 
                // Si no es 0 --> Sumar 1 al contador
                    // Agregar estudio a lote
                    // Si contador es 10 --> Reiniciar contador
                        // Cerrar lote


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

// R22 - F

router.get('/perfil', verifyToken, (req, res) => {
    res.send(req.userId);
})



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