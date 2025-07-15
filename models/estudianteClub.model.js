module.exports = (sequelize, DataTypes) => {
  return sequelize.define("EstudianteClub", {
    DNI_ESTUDIANTE: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ID_CLUB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: "ESTUDIANTE_CLUB",
    freezeTableName: true,
    timestamps: false
  });
};
