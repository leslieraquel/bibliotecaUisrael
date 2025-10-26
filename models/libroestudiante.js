const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const LibroEstudiante = sequelize.define('LibroEstudiante', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  libroId: { type: DataTypes.INTEGER, allowNull: false },
  estudianteId: { type: DataTypes.INTEGER, allowNull: false },
  fechaPrestamo: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  fechaDevolucion: { type: DataTypes.DATE, allowNull: true },
  estado: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'prestado' } // prestado, devuelto, retrasado...
}, { tableName: 'libro_estudiantes' });


 LibroEstudiante.associate = (models) => {
    // Cada registro pertenece a un libro
    LibroEstudiante.belongsTo(models.Libro, {
      foreignKey: 'libroId',
      as: 'libro'
    });

    // Cada registro pertenece a un estudiante
    LibroEstudiante.belongsTo(models.Estudiante, {
      foreignKey: 'estudianteId',
      as: 'estudiante'
    });
  };


module.exports = LibroEstudiante;