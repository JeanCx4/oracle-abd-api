const express = require('express');
const router = express.Router();
const db = require('../models');
const EstudianteClub = db.EstudianteClub;

router.post('/', async (req, res) => {
  try {
    const { dniEstudiante, idClub } = req.body;

    const asociacion = await EstudianteClub.create({
      DNI_ESTUDIANTE: dniEstudiante,
      ID_CLUB: idClub
    });

    res.status(201).json({
      mensaje: 'Asociación creada correctamente',
      data: asociacion
    });
  } catch (error) {
    console.error('💥 Error en POST /estudiante-club:', error);
    res.status(500).json({ mensaje: 'Error al asociar club' });
  }
});

router.get('/', async (req, res) => {
  try {
    const asociaciones = await EstudianteClub.findAll();
    res.json(asociaciones);
  } catch (error) {
    console.error('💥 Error en GET /estudiante-club:', error);
    res.status(500).json({ mensaje: 'Error al obtener asociaciones' });
  }
});

module.exports = router;
