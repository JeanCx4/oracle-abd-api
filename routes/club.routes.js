const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/club.controller');

router.get('/', ctrl.obtenerClubes);
router.post('/', ctrl.crearClub);

module.exports = router;
