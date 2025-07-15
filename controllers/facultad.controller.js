const { Facultad } = require('../models'); // ✅

exports.obtenerFacultades = async (req, res) => {
  try {
    const datos = await Facultad.findAll();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearFacultad = async (req, res) => {
  try {
    const registro = await Facultad.create(req.body);
    res.status(201).json(registro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
