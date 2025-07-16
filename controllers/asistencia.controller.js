const { Asistencia, Estudiante } = require('../models');
const { Op } = require('sequelize');

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
    const { DNI_ESTUDIANTE } = req.body;

    if (!DNI_ESTUDIANTE) {
      return res.status(400).json({ error: 'DNI del estudiante es requerido' });
    }

    // Verificar que el estudiante existe
    const estudiante = await Estudiante.findByPk(DNI_ESTUDIANTE);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Verificar si ya registró asistencia hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    const asistenciaHoy = await Asistencia.findOne({
      where: {
        DNI_ESTUDIANTE: DNI_ESTUDIANTE,
        FECHA_HORA: {
          [Op.gte]: hoy,
          [Op.lt]: mañana
        }
      }
    });

    if (asistenciaHoy) {
      return res.status(400).json({ 
        error: 'Ya se registró asistencia para este estudiante hoy',
        asistencia: asistenciaHoy
      });
    }

    // Crear nueva asistencia con fecha actual
    const nuevaAsistencia = await Asistencia.create({
      DNI_ESTUDIANTE: DNI_ESTUDIANTE,
      FECHA_HORA: new Date()
    });

    // Retornar con información del estudiante
    const asistenciaCompleta = await Asistencia.findByPk(nuevaAsistencia.ID, {
      include: [{
        model: Estudiante,
        attributes: ['DNI', 'NOMBRES', 'APELLIDOS']
      }]
    });

    res.status(201).json({
      mensaje: 'Asistencia registrada exitosamente',
      asistencia: asistenciaCompleta
    });

  } catch (err) {
    console.error('💥 Error al registrar asistencia:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📱 Registrar asistencia por QR
exports.registrarAsistenciaPorQR = async (req, res) => {
  try {
    const { dni } = req.body;

    if (!dni) {
      return res.status(400).json({ error: 'DNI es requerido' });
    }

    // Verificar que el estudiante existe
    const estudiante = await Estudiante.findByPk(dni);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Verificar si ya registró asistencia hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    const asistenciaHoy = await Asistencia.findOne({
      where: {
        DNI_ESTUDIANTE: dni,
        FECHA_HORA: {
          [Op.gte]: hoy,
          [Op.lt]: mañana
        }
      }
    });

    if (asistenciaHoy) {
      return res.status(400).json({ 
        error: 'Ya se registró asistencia para este estudiante hoy',
        asistencia: asistenciaHoy
      });
    }

    // Crear nueva asistencia
    const nuevaAsistencia = await Asistencia.create({
      DNI_ESTUDIANTE: dni,
      FECHA_HORA: new Date()
    });

    // Retornar con información del estudiante
    const asistenciaCompleta = await Asistencia.findByPk(nuevaAsistencia.ID, {
      include: [{
        model: Estudiante,
        attributes: ['DNI', 'NOMBRES', 'APELLIDOS']
      }]
    });

    res.status(201).json({
      mensaje: 'Asistencia registrada exitosamente',
      asistencia: asistenciaCompleta
    });

  } catch (err) {
    console.error('💥 Error al registrar asistencia por QR:', err);
    res.status(500).json({ error: err.message });
  }
};


