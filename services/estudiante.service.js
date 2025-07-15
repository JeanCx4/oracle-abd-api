const Estudiante = require('../models/estudiante.model');

exports.getAll = () => Estudiante.findAll();

exports.create = (data) => Estudiante.create(data);

exports.update = (dni, data) => Estudiante.update(data, { where: { dni } });

exports.remove = (dni) => Estudiante.destroy({ where: { dni } });
