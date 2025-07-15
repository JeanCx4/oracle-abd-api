const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
require('dotenv').config();

exports.verificarCredenciales = async (correo, clave) => {
  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) throw new Error('Usuario no encontrado');

  const esValido = await bcrypt.compare(clave, usuario.clave);
  if (!esValido) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '4h' });
  return token;
};
