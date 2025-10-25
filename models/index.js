// models/index.js
const sequelize = require('../database/connection');

const Autor = require('./autor');
const Libro = require('./libro');
const Estudiante = require('./estudiante');
const LibroEstudiante = require('./libroestudiante');

// Asociaciones
Autor.hasMany(Libro, { foreignKey: 'autorId', as: 'libros' });
Libro.belongsTo(Autor, { foreignKey: 'autorId', as: 'autor' });

Libro.hasMany(LibroEstudiante, { foreignKey: 'libroId', as: 'registros' });
LibroEstudiante.belongsTo(Libro, { foreignKey: 'libroId', as: 'libro' });

Estudiante.hasMany(LibroEstudiante, { foreignKey: 'estudianteId', as: 'registros' });
LibroEstudiante.belongsTo(Estudiante, { foreignKey: 'estudianteId', as: 'estudiante' });

Libro.belongsToMany(Estudiante, { through: LibroEstudiante, foreignKey: 'libroId', otherKey: 'estudianteId', as: 'estudiantes' });
Estudiante.belongsToMany(Libro, { through: LibroEstudiante, foreignKey: 'estudianteId', otherKey: 'libroId', as: 'libros' });

// Exportar
module.exports = {
  sequelize,
  Autor,
  Libro,
  Estudiante,
  LibroEstudiante
};
