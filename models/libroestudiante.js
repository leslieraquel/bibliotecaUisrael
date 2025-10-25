
module.exports = (sequelize, DataTypes) => {
    const LibroEstudiantes = sequelize.define('LibroEstudiantes', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        // Claves Foráneas de la relación M:M
        libroId: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        estudianteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        fechaPrestamo: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        fechaDevolucion: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'libro_estudiantes',
        timestamps: false
    });

    return LibroEstudiantes;
};