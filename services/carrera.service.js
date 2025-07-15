const Carrera = require('../models/carrera.model');
const Facultad = require('../models/facultad.model');

exports.getAll = () => Carrera.findAll({ include: Facultad });
exports.create = (data) => Carrera.create(data);
