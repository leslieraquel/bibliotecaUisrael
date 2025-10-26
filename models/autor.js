const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Autor = sequelize.define('Autor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  bio: { type: DataTypes.TEXT }
}, { tableName: 'autores', timestamps: false });

Autor.associate = (models) => {
    Autor.hasMany(models.Libro, { foreignKey: 'autorId', as: 'libros' });
 };


module.exports = Autor;
