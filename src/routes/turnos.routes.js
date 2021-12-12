const { Router } = require('express');
const router = Router();
const turnoControllers = require('../controllers/turno.controllers');

router.get('/prueba-turnos', turnoControllers.pruebaTurnos);
router.get('/get-turnos/:date', turnoControllers.pruebaTurnos);
router.post('/tomar-turno/:datetime', turnoControllers.pruebaTurnos);


module.exports = router