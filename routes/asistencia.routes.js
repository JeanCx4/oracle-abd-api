const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/asistencia.controller');

router.get('/', ctrl.obtenerAsistencias);
router.post('/', ctrl.registrarAsistencia);

module.exports = router;
