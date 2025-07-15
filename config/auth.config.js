// config/auth.config.js
const bcrypt = require('bcryptjs');

// Hashea la contraseña una sola vez para guardar en el archivo
const hashedAdmin = bcrypt.hashSync('aaron159', 10);
const hashedAdmin1 = bcrypt.hashSync('jean456', 10);

exports.users = [
  {
    correo: 'aaron@gmail.com',
    clave: hashedAdmin,
    nombre: 'Administrador',
    rol: 'admin'
  },
  {
    correo: 'jean@gmail.com',
    clave: hashedAdmin1,
    nombre: 'Administrador',
    rol: 'admin'
  }
];
