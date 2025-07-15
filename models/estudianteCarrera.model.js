module.exports = (sequelize, DataTypes) => {
  return sequelize.define("EstudianteCarrera", {
    DNI_ESTUDIANTE: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ID_CARRERA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: "ESTUDIANTE_CARRERA",
    freezeTableName: true,
    timestamps: false
  });
};
