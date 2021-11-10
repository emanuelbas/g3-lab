const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const MedicoDerivante = require('../models/MedicoDerivante');
const User = require('../models/User');
const Empleado = require('../models/Empleado')


router.post('/registrar', async (req, res) => {
    const { email, password, rol } = req.body;
    console.log(email, password)
    const nuevoUsuario = new User({ email, password, rol });
    await nuevoUsuario.save();

    const token = jwt.sign({ _id: nuevoUsuario._id }, 'secretKey')
    res.status(200).json({ token })

})


// S1R02 - I
   
router.post('/alta-empleado', async (req, res) => {
    const {name, surname, email, phone, _id} = req.body;
    //una ves que tenga los datos, crear empleado
    
    //crear usuario
    //relacionar empleado
    const nuevoEmpleado = new Empleado({ name, surname, email, phone, _id});
    await nuevoEmpleado.save().then(()=>res.status(200).send({status:"OK"}))
    

})

// S1R03 - I
router.get('/obtener-medico-derivante', async (req, res) => {
    let medicosDerivantes = await MedicoDerivante.find({'status': true})

    res.status(200).json(medicosDerivantes)

})

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