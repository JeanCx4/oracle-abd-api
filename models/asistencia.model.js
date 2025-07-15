module.exports = (sequelize, DataTypes) => {
  const Asistencia = sequelize.define("Asistencia", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    DNI_ESTUDIANTE: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    FECHA_HORA: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "ASISTENCIAS",
    freezeTableName: true,
    timestamps: false
  });

  // ✅ Aquí está lo que faltaba: asociación con Estudiante
  Asistencia.associate = (models) => {
    Asistencia.belongsTo(models.Estudiante, {
      foreignKey: 'DNI_ESTUDIANTE',
      targetKey: 'DNI'
    });
  };

  return Asistencia;
};
