const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
//const MedicoDerivante = require('../models/MedicoDerivante');

router.post('/registrar', async (req, res) => {
    const { email, password, rol } = req.body;
    console.log(email, password)
    const nuevoUsuario = new User({ email, password, rol });
    await nuevoUsuario.save();

    const token = jwt.sign({ _id: nuevoUsuario._id }, 'secretKey')
    res.status(200).json({ token })

})

// S1R03 - I
/* router.post('/alta-medico-derivante', async (req, res) => {



    let user = await User.findOne({email})

    if (!user) {
        return res.status(401).send("El correo no existe");
    }
    if (user.password !== password) return res.status(401).send('Password incorrecta');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token});    
})


router.post('/alta-medico-derivante', async (req, res) => {
    const {name, surname, email, phone} = req.body;

    const newMedicoDerivante = new MedicoDerivante({name, surname, email, phone});
    await newMedicoDerivante.save();

    res.status(200).json("OK")

}) */
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