module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define("Club", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: "CLUBES",
    freezeTableName: true,
    timestamps: false
  });

  Club.associate = (models) => {
    Club.belongsToMany(models.Estudiante, {
      through: models.EstudianteClub,
      foreignKey: 'ID_CLUB',
      otherKey: 'DNI_ESTUDIANTE'
    });
  };

  return Club;
};
