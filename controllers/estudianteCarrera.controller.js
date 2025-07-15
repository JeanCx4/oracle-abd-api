const EstudianteCarrera = require('../models/estudianteCarrera.model');

exports.asociarCarrera = async (req, res) => {
    try {
      const { dniEstudiante, idCarrera } = req.body;

      // Validación de entrada
      if (!dniEstudiante || !idCarrera) {
        return res.status(400).json({ error: 'DNI del estudiante y ID de carrera son requeridos' });
      }

      // Verificar si la asociación ya existe
      const existe = await EstudianteCarrera.findOne({ where: { dniEstudiante, idCarrera } });
      if (existe) {
        return res.status(409).json({ error: 'La asociación entre este estudiante y carrera ya existe' });
      }

      // Crear la asociación
      const asociacion = await EstudianteCarrera.create({ dniEstudiante, idCarrera });
      console.log(`Asociación creada: DNI ${dniEstudiante} con carrera ID ${idCarrera}`); // Temporal
      res.status(201).json(asociacion);
    } catch (err) {
      console.error(`Error al asociar carrera: ${err.message}`); // Temporal
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

router.get('/', async (req, res) => {
  try {
    const registros = await EstudianteCarrera.findAll();
    res.json(registros);
  } catch (error) {
    console.error('💥 Error en GET estudiante-carrera:', error);
    res.status(500).json({ mensaje: 'Error al obtener registros' });
  }
});

