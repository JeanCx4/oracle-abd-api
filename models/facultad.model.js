module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Facultad", {
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
    tableName: "FACULTADES",
    freezeTableName: true,
    timestamps: false
  });
};
