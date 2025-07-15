const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/carrera.controller');

router.get('/', ctrl.obtenerCarreras);            // ✅ Con Facultad incluida
router.get('/:id', ctrl.obtenerCarreraPorId);
router.post('/', ctrl.crearCarrera);
router.put('/:id', ctrl.actualizarCarrera);
router.delete('/:id', ctrl.eliminarCarrera);

module.exports = router;
