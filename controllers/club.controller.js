const { Club } = require('../models');

exports.obtenerClubes = async (req, res) => {
  try {
    const datos = await Club.findAll(); // Puedes añadir order si quieres
    res.json(datos);
  } catch (err) {
    console.error('💥 Error al obtener clubes:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.crearClub = async (req, res) => {
  try {
    const nuevo = await Club.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('💥 Error al crear club:', err);
    res.status(500).json({ error: err.message });
  }
};