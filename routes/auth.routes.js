const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../config/auth.config');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

router.post('/login', async (req, res) => {
  try {
    const correo = req.body.correo?.trim().toLowerCase();
    const clave = req.body.clave;

    if (!correo || !clave) {
      console.warn('⚠️ Credenciales incompletas.');
      return res.status(400).json({ mensaje: 'Correo y clave son obligatorios.' });
    }

    const usuario = users.find(u => u.correo === correo);

    if (!usuario) {
      console.warn(`⚠️ Usuario no encontrado: "${correo}"`);
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esValido = await bcrypt.compare(clave, usuario.clave);
    if (!esValido) {
      console.warn('⚠️ Clave incorrecta para:', correo);
      return res.status(401).json({ mensaje: 'Clave incorrecta.' });
    }

    const token = jwt.sign(
      { correo: usuario.correo, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log(`✅ Login exitoso para "${usuario.correo}".`);

    res.status(200).json({
      token,
      usuario: {
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('💥 Error en /login:', error.message);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;
