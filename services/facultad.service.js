const Facultad = require('../models/facultad.model');

exports.getAll = () => Facultad.findAll();
exports.create = (data) => Facultad.create(data);
