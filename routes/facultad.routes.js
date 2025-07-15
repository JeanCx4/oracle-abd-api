const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/facultad.controller');

router.get('/', ctrl.obtenerFacultades);
router.post('/', ctrl.crearFacultad);

module.exports = router;
