//Bloque 1:
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");


//Bloque 3:
const app = express();
const port = 3977;

//Bloque 4:
app.use(cors());

//Bloque 5:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Bloque 6:
const bibliotecaRoutes = require("./routes/libro");
// app.use('/api/biblioteca', bibliotecaRoutes);

//Bloque 7:
app.listen(port, ()=>{
    console.log("Servidor esta corriendo correctamente en el puerto: "+port);
})