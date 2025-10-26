const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Libro = sequelize.define('Libro', {
  idlibros: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING(250), allowNull: false },
  isbn: { type: DataTypes.STRING(50), allowNull: true },
  editorial: { type: DataTypes.STRING(150), allowNull: true },
  anio: { type: DataTypes.INTEGER, allowNull: true },
  autorId: { type: DataTypes.INTEGER, allowNull: false } // FK a Autor
}, { tableName: 'libros' });

module.exports = Libro;

