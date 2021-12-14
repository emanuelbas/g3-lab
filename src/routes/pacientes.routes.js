const { Router } = require('express');
const router = Router();
const pacienteControllers = require('../controllers/paciente.controllers');

router.get('/obtener-pacientes', pacienteControllers.getPacientes)

module.exports = router