const Club = require('../models/club.model');

exports.getAll = () => Club.findAll();
exports.create = (data) => Club.create(data);
