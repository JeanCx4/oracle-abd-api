const QRCode = require('qrcode');
const { Estudiante, Carrera, Club, Asistencia } = require('../models');

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

// 🧠 Generar QR con enlace al perfil
const generarQRConEnlace = async (dni) => {
  const estudiante = await Estudiante.findByPk(dni, {
    include: [
      { model: Carrera, through: { attributes: [] } },
      { model: Club, through: { attributes: [] } }
    ]
  });

  if (!estudiante) return null;

  const qrTexto = `${baseURL}/perfil-estudiante/${estudiante.DNI}`;

  try {
    const qrBuffer = await QRCode.toBuffer(qrTexto);

    if (!qrBuffer || qrBuffer.length === 0) {
      throw new Error('QR vacío');
    }

    estudiante.QR_CODE = qrTexto;
    estudiante.QR_IMAGEN = qrBuffer.toString('base64');
    await estudiante.save();
  } catch (err) {
    console.error(`❌ Error generando QR para ${estudiante.DNI}:`, err);
    estudiante.QR_CODE = qrTexto;
    estudiante.QR_IMAGEN = null;
  }

  return estudiante;
};

// 🎓 Obtener todos los estudiantes
const obtenerEstudiantes = async (req, res) => {
  try {
    const datos = await Estudiante.findAll({
      include: [
        { model: Carrera, through: { attributes: [] } },
        { model: Club, through: { attributes: [] } }
      ],
      order: [['DNI', 'ASC']]
    });
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🎓 Obtener estudiante por DNI
const obtenerPorDni = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.dni, {
      include: [
        { model: Carrera, through: { attributes: [] } },
        { model: Club, through: { attributes: [] } }
      ]
    });

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    res.json(estudiante);
  } catch (err) {
    console.error('💥 Error al buscar estudiante:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🎓 Crear estudiante
const crearEstudiante = async (req, res) => {
  try {
    const { CARRERAS, CLUBES, ...datos } = req.body;
    const nuevo = await Estudiante.create(datos);

    if (Array.isArray(CARRERAS)) {
      await nuevo.setCarreras(CARRERAS.filter(id => Number.isInteger(id)));
    }

    if (Array.isArray(CLUBES)) {
      await nuevo.setClubs(CLUBES.filter(id => Number.isInteger(id)));
    }

    await nuevo.reload();

    const estudianteConQR = await generarQRConEnlace(nuevo.DNI);
    res.status(201).json(estudianteConQR);
  } catch (err) {
    console.error('❌ Error al crear estudiante:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🎓 Actualizar estudiante — ✅ Corregido
const actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.dni);
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    const { CARRERAS, CLUBES, ...datos } = req.body;

    await estudiante.update(datos);

    if (Array.isArray(CARRERAS)) {
      await estudiante.setCarreras(CARRERAS.filter(id => Number.isInteger(id)));
    }

    if (Array.isArray(CLUBES)) {
      await estudiante.setClubs(CLUBES.filter(id => Number.isInteger(id)));
    }

    await estudiante.reload();

    const estudianteConQR = await generarQRConEnlace(estudiante.DNI);
    res.json({ mensaje: 'Estudiante actualizado', estudiante: estudianteConQR });
  } catch (err) {
    console.error('❌ Error actualizando estudiante:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🎓 Eliminar estudiante
const eliminarEstudiante = async (req, res) => {
  try {
    await Estudiante.destroy({ where: { DNI: req.params.dni } });
    res.json({ mensaje: 'Estudiante eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🎓 Generar QR manual
const generarQR = async (req, res) => {
  try {
    const estudianteConQR = await generarQRConEnlace(req.params.dni);
    if (!estudianteConQR) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    res.json({
      mensaje: 'QR generado correctamente',
      qrCode: estudianteConQR.QR_CODE,
      qrBase64: estudianteConQR.QR_IMAGEN
    });
  } catch (err) {
    console.error('💥 Error al generar QR:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔄 Regenerar todos los QR faltantes
const regenerarTodosLosQR = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    let actualizados = 0;

    for (const estudiante of estudiantes) {
      if (!estudiante.QR_IMAGEN || estudiante.QR_IMAGEN.length < 100) {
        await generarQRConEnlace(estudiante.DNI);
        actualizados++;
      }
    }

    res.json({ mensaje: `QR generados/actualizados para ${actualizados} estudiantes.` });
  } catch (err) {
    console.error('💥 Error regenerando QR:', err);
    res.status(500).json({ error: err.message });
  }
};

// 🕒 Obtener asistencias con nombres del estudiante
const obtenerAsistencias = async (req, res) => {
  try {
    const datos = await Asistencia.findAll({
      include: [{
        model: Estudiante,
        attributes: ['DNI', 'NOMBRES', 'APELLIDOS'],
        required: false
      }],
      order: [['FECHA_HORA', 'DESC']]
    });
    res.json(datos);
  } catch (err) {
    console.error('💥 Error al obtener asistencias:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📱 Validar DNI desde QR
const validarDniQR = async (req, res) => {
  try {
    const { dni } = req.params;

    if (!dni) {
      return res.status(400).json({ error: 'DNI es requerido' });
    }

    const estudiante = await Estudiante.findByPk(dni, {
      attributes: ['DNI', 'NOMBRES', 'APELLIDOS', 'EMAIL', 'FOTO'],
      include: [
        { model: Carrera, through: { attributes: [] } },
        { model: Club, through: { attributes: [] } }
      ]
    });

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json({
      valido: true,
      estudiante: estudiante
    });

  } catch (err) {
    console.error('💥 Error al validar DNI del QR:', err);
    res.status(500).json({ error: err.message });
  }
};

// 📱 Generar QR específico para asistencia
const generarQRAsistencia = async (req, res) => {
  try {
    const { dni } = req.params;

    const estudiante = await Estudiante.findByPk(dni);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Generar QR con información específica para asistencia
    const qrData = {
      tipo: 'asistencia',
      dni: estudiante.DNI,
      timestamp: Date.now()
    };

    const qrTexto = JSON.stringify(qrData);
    
    try {
      const qrBuffer = await QRCode.toBuffer(qrTexto, {
        errorCorrectionLevel: 'M',
        type: 'png',
        quality: 0.92,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      const qrBase64 = qrBuffer.toString('base64');

      res.json({
        estudiante: {
          DNI: estudiante.DNI,
          NOMBRES: estudiante.NOMBRES,
          APELLIDOS: estudiante.APELLIDOS
        },
        qr: {
          data: qrTexto,
          image: `data:image/png;base64,${qrBase64}`
        }
      });

    } catch (qrErr) {
      console.error('Error generando QR:', qrErr);
      res.status(500).json({ error: 'Error al generar código QR' });
    }

  } catch (err) {
    console.error('💥 Error en generarQRAsistencia:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Exportar todas las funciones
module.exports = {
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudiantes,
  obtenerPorDni,
  generarQR,
  regenerarTodosLosQR,
  obtenerAsistencias,
  validarDniQR,
  generarQRAsistencia
};
