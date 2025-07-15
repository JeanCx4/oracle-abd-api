module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    ID_FACULTAD: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'CARRERAS',
    freezeTableName: true,
    timestamps: false
  });

  Carrera.associate = (models) => {
    Carrera.belongsTo(models.Facultad, {
      foreignKey: 'ID_FACULTAD'
    });

    Carrera.belongsToMany(models.Estudiante, {
      through: models.EstudianteCarrera,
      foreignKey: 'ID_CARRERA',
      otherKey: 'DNI_ESTUDIANTE'
    });
  };

  return Carrera;
};
