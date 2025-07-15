const EstudianteClub = require('../models/estudianteClub.model');

exports.asociarClub = async (req, res) => {
    try {
      const { dniEstudiante, idClub } = req.body;

      // Validación de entrada
      if (!dniEstudiante || !idClub) {
        return res.status(400).json({ error: 'DNI del estudiante y ID de club son requeridos' });
      }

      // Verificar si la asociación ya existe
      const existe = await EstudianteClub.findOne({ where: { dniEstudiante, idClub } });
      if (existe) {
        return res.status(409).json({ error: 'La asociación entre este estudiante y club ya existe' });
      }

      // Crear la asociación
      const nuevo = await EstudianteClub.create({ dniEstudiante, idClub });
      console.log(`Asociación creada: DNI ${dniEstudiante} con club ID ${idClub}`); // Temporal
      res.status(201).json(nuevo);
    } catch (err) {
      console.error(`Error al asociar club: ${err.message}`); // Temporal
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};
