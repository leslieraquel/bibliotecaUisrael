const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Estudiante = sequelize.define('Estudiante', {
  idestudiantes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  correo: { type: DataTypes.STRING(150), allowNull: true, unique: false },
  carrera: { type: DataTypes.STRING(100), allowNull: true }
}, { tableName: 'estudiantes' });

  Estudiante.associate = (models) => {
    Estudiante.hasMany(models.LibroEstudiante, {
      foreignKey: 'estudianteId',
      as: 'registros'
    });

    Estudiante.belongsToMany(models.Libro, {
      through: models.LibroEstudiante,
      foreignKey: 'estudianteId',
      otherKey: 'libroId',
      as: 'libros'
    });
  };

module.exports = Estudiante;
