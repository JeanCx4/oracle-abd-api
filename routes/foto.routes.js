const express = require('express');
const router = express.Router();
const upload = require('../uploads');
const controlador = require('../controllers/photo.controller');

router.post('/subir', upload.single('foto'), controlador.subirFoto);

module.exports = router;
