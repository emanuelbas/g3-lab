const { Router } = require('express');
const router = Router();
const turnoControllers = require('../controllers/turno.controllers');

router.get('/prueba-turnos', turnoControllers.pruebaTurnos);
router.get('/get-turnos-libres/:date', turnoControllers.getTurnosLibres);
router.post('/tomar-turno', turnoControllers.tomarTurno);


module.exports = router