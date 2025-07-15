const express = require('express');
const router = express.Router();
const db = require('../models');
const EstudianteCarrera = db.EstudianteCarrera;

router.post('/', async (req, res) => {
  try {
    const { dniEstudiante, idCarrera } = req.body;

    const asociacion = await EstudianteCarrera.create({
      DNI_ESTUDIANTE: dniEstudiante,
      ID_CARRERA: idCarrera
    });

    res.status(201).json({
      mensaje: 'Asociación creada correctamente',
      data: asociacion
    });
  } catch (error) {
    console.error('💥 Error en POST /estudiante-carrera:', error);
    res.status(500).json({ mensaje: 'Error al asociar carrera' });
  }
});

router.get('/', async (req, res) => {
  try {
    const asociaciones = await EstudianteCarrera.findAll();
    res.json(asociaciones);
  } catch (error) {
    console.error('💥 Error en GET /estudiante-carrera:', error);
    res.status(500).json({ mensaje: 'Error al obtener asociaciones' });
  }
});

module.exports = router;
