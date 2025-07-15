const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos activos
db.Facultad = require('./facultad.model')(sequelize, Sequelize.DataTypes);
db.Carrera = require('./carrera.model')(sequelize, Sequelize.DataTypes);
db.Club = require('./club.model')(sequelize, Sequelize.DataTypes);
db.Estudiante = require('./estudiante.model')(sequelize, Sequelize.DataTypes);
db.Asistencia = require('./asistencia.model')(sequelize, Sequelize.DataTypes);
db.EstudianteCarrera = require('./estudianteCarrera.model')(sequelize, Sequelize.DataTypes);
db.EstudianteClub = require('./estudianteClub.model')(sequelize, Sequelize.DataTypes);

// Asociaciones
Object.values(db).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

// Sincronización
db.syncModels = async () => {
  try {
    await sequelize.sync(); // puedes usar { alter: true } si lo deseas
    console.log('✅ Tablas sincronizadas correctamente.');
  } catch (err) {
    console.error('💥 Error al sincronizar tablas:', err);
  }
};

module.exports = db;


