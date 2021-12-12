const { Router } = require('express');
const router = Router();
const turnoControllers = require('../controllers/turno.controllers');

router.get('/prueba-turnos', turnoControllers.pruebaTurnos);




module.exports = router