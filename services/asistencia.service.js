const Asistencia = require('../models/asistencia.model');
const Estudiante = require('../models/estudiante.model');

exports.getAll = () => Asistencia.findAll({ include: Estudiante });

exports.create = (data) => Asistencia.create(data);
