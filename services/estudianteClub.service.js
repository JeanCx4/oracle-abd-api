const EstudianteClub = require('../models/estudianteClub.model');

exports.asociar = (data) => EstudianteClub.create(data);
