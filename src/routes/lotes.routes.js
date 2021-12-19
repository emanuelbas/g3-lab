const { Router } = require('express');
const router = Router();
const loteControllers = require('../controllers/lote.controllers');

router.get('/encolar-estudio-a-lote', loteControllers.encolarEstudio)
router.get('/lote-siguiente-estado', loteControllers.siguienteEstado)

module.exports = router