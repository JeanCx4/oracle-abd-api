module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiante', {
    DNI: {
      type: DataTypes.STRING(10),
      primaryKey: true
    },
    NOMBRES: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    APELLIDOS: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    FECHA_NACIMIENTO: DataTypes.DATE,
    TELEFONO: {
      type: DataTypes.STRING(20),
      unique: true
    },
    EMAIL: {
      type: DataTypes.STRING(100),
      unique: true
    },
    FOTO: DataTypes.TEXT,        // base64 o URL
    QR_CODE: DataTypes.TEXT,     // enlace del QR
    QR_IMAGEN: DataTypes.TEXT('long')  // base64 para renderizar
  }, {
    tableName: 'ESTUDIANTES',
    freezeTableName: true,
    timestamps: false
  });

  // 🔗 Asociaciones
  Estudiante.associate = (models) => {
    Estudiante.belongsToMany(models.Carrera, {
      through: models.EstudianteCarrera,
      foreignKey: 'DNI_ESTUDIANTE',
      otherKey: 'ID_CARRERA'
    });

    Estudiante.belongsToMany(models.Club, {
      through: models.EstudianteClub,
      foreignKey: 'DNI_ESTUDIANTE',
      otherKey: 'ID_CLUB'
    });

    // 🕒 Asociación con Asistencia
    Estudiante.hasMany(models.Asistencia, {
      foreignKey: 'DNI_ESTUDIANTE',
      sourceKey: 'DNI'
    });
  };

  return Estudiante;
};

