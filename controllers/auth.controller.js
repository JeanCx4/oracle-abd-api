const { verificarCredenciales } = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const { correo, clave } = req.body;
    const token = await verificarCredenciales(correo, clave);

    res.status(200).json({ token });
  } catch (error) {
    console.error('❌ Error en autenticación:', error.message);
    res.status(401).json({ mensaje: error.message });
  }
};
