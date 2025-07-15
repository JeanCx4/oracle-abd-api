const { Carrera, Facultad } = require('../models');

// 📥 Obtener todas las carreras con su Facultad
exports.obtenerCarreras = async (req, res) => {
  try {
    const datos = await Carrera.findAll({
      include: {
        model: Facultad,
        attributes: ['ID', 'NOMBRE'] // sin alias
      },
      order: [['ID', 'ASC']]
    });
    res.json(datos);
  } catch (err) {
    console.error('💥 Error al obtener carreras:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🆕 Crear nueva carrera
exports.crearCarrera = async (req, res) => {
  try {
    const registro = await Carrera.create(req.body);
    res.status(201).json(registro);
  } catch (err) {
    console.error('💥 Error al crear carrera:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📝 Editar carrera por ID
exports.actualizarCarrera = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Carrera.update(req.body, { where: { ID: id } });
    res.json({ mensaje: 'Carrera actualizada correctamente', resultado });
  } catch (err) {
    console.error('💥 Error al actualizar carrera:', err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Eliminar carrera
exports.eliminarCarrera = async (req, res) => {
  try {
    const { id } = req.params;
    await Carrera.destroy({ where: { ID: id } });
    res.json({ mensaje: 'Carrera eliminada correctamente' });
  } catch (err) {
    console.error('💥 Error al eliminar carrera:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Buscar carrera por ID
exports.obtenerCarreraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const carrera = await Carrera.findByPk(id, {
      include: {
        model: Facultad,
        attributes: ['ID', 'NOMBRE']
      }
    });
    if (!carrera) {
      return res.status(404).json({ mensaje: 'Carrera no encontrada' });
    }
    res.json(carrera);
  } catch (err) {
    console.error('💥 Error al buscar carrera:', err);
    res.status(500).json({ error: err.message });
  }
};

