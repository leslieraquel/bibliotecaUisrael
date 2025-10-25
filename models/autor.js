// models/autor.js

module.exports = (sequelize, DataTypes) => {
    // Definición de la CLASE como 'Autor' (convención)
    const Autor = sequelize.define('Autor', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'autores',
        timestamps: false
    });
    
    // 🔗 ASOCIACIÓN: Autor tiene Muchos Libros (1:N)
    Autor.associate = function(models) {
        // Referencia a 'models.Libro'
        Autor.hasMany(models.Libro, {
            foreignKey: 'autorId', 
            as: 'libros'
        });
    };

    return Autor;
};