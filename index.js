const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// 📦 Inicialización de la app
const app = express();
const PORT = process.env.PORT || 3001;

// 🔐 Middlewares globales
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 📁 Importación de rutas organizadas
const authRoutes = require('./routes/auth.routes');
const facultadRoutes = require('./routes/facultad.routes');
const carreraRoutes = require('./routes/carrera.routes');
const estudianteRoutes = require('./routes/estudiante.routes');
const asistenciaRoutes = require('./routes/asistencia.routes');
const estudianteCarreraRoutes = require('./routes/estudianteCarrera.routes');
const clubRoutes = require('./routes/club.routes');
const estudianteClubRoutes = require('./routes/estudianteClub.routes');
const fotoRoutes = require('./routes/foto.routes');

// 🚦 Asignación de prefijos a rutas
app.use('/api/auth', authRoutes);
app.use('/api/facultades', facultadRoutes);
app.use('/api/carreras', carreraRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/estudiante-carrera', estudianteCarreraRoutes);
app.use('/api/clubes', clubRoutes);
app.use('/api/estudiante-club', estudianteClubRoutes);
app.use('/api/fotos', fotoRoutes);

// 🔗 Conexión y sincronización de modelos
const { syncModels } = require('./models');

syncModels()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('💥 Error al iniciar el servidor:', err);
  });
