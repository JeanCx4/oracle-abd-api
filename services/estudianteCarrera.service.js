const EstudianteCarrera = require('../models/estudianteCarrera.model');

exports.asociar = (data) => EstudianteCarrera.create(data);
