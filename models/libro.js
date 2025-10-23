//Importar la libreria de mongoose
// const {Schema, model} = require("mongoose");
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

//Crear esquema (estructura de cada documento de tipo proyecto)
const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'default.png',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'books', // Nombre de la tabla en la base de datos
    timestamps: false    // Para que no cree createdAt y updatedAt automáticamente
});
//Crear el modelo, indicarle la coleccion donde se van a guardar los documentoss
//exportar el modelo
module.exports = Book;