const { Asistencia, Estudiante } = require('../models');

// 🕒 Obtener asistencias (con nombres del estudiante)
exports.obtenerAsistencias = async (req, res) => {
  try {
    const datos = await Asistencia.findAll({
      include: [{
        model: Estudiante,
        attributes: ['DNI', 'NOMBRES', 'APELLIDOS'],
        required: false // tolerante si el estudiante fue eliminado
      }],
      order: [['FECHA_HORA', 'DESC']] // muestra primero las más recientes
    });
    res.json(datos);
  } catch (err) {
    console.error('💥 Error al obtener asistencias:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Registrar nueva asistencia
exports.registrarAsistencia = async (req, res) => {
  try {
    const nueva = await Asistencia.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error('💥 Error al registrar asistencia:', err);
    res.status(500).json({ error: err.message });
  }
};


