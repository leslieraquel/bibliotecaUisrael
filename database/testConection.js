const sequelize = require('./database/connection');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error(' Error al conectar:', error);
  } finally {
    await sequelize.close();
  }
})();