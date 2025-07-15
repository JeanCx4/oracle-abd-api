module.exports = (req, res, next) => {
  const { correo, clave } = req.body;

  // Validar formato de correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo && !regexCorreo.test(correo)) {
    return res.status(400).json({ mensaje: 'Correo no válido' });
  }

  // Validar longitud de la contraseña
  if (clave && clave.length < 6) {
    return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
  }

  next();
};
