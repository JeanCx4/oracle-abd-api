const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generarToken = (payload, expiracion = '4h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiracion });
};

exports.verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
