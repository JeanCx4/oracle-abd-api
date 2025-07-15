const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 1521,
    dialect: 'oracle',
    dialectOptions: {
      connectString: process.env.DB_CONNECT_STRING,
    },
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true,
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a Oracle establecida correctamente.'))
  .catch(err => console.error('❌ Error al conectar a Oracle:', err));

module.exports = sequelize;

