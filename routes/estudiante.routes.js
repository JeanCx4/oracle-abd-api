const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estudiante.controller');

// Rutas generales
router.get('/', ctrl.obtenerEstudiantes);
router.post('/', ctrl.crearEstudiante);
router.put('/:dni', ctrl.actualizarEstudiante);
router.delete('/:dni', ctrl.eliminarEstudiante);

// ✅ Rutas específicas deben ir ANTES de las rutas con parámetros dinámicos
router.get('/qr/:dni', ctrl.generarQR);
router.get('/admin/regenerar-qr/todos', ctrl.regenerarTodosLosQR);

// Esta debe ir al final para evitar conflictos
router.get('/:dni', ctrl.obtenerPorDni);

module.exports = router;
