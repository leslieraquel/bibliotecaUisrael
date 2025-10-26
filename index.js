//Bloque 1:
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
const sequelize = require('./database/connection');


//Bloque 3:
const app = express();
const port = 3977;

//Bloque 4:
app.use(cors());

//Bloque 5:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Bloque 6:// Importar rutas
const autorRoutes = require("./routes/autor");
const libroRoutes = require("./routes/libro");
const estudianteRoutes = require("./routes/estudiante");
const libroEstudianteRoutes = require("./routes/libroestudiante");

// Usar rutas
app.use("/api/autores", autorRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/estudiantes", estudianteRoutes);
app.use("/api/registros", libroEstudianteRoutes);

//Bloque 7:
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos MySQL');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
  }
})();

app.listen(port, ()=>{
    console.log("Servidor esta corriendo correctamente en el puerto: "+port);
})