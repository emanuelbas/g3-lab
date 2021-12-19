const { Router } = require('express');
const router = Router();
const loteControllers = require('../controllers/lote.controllers');

router.get('/encolar-estudio-a-lote', loteControllers.encolarEstudio)

module.exports = router