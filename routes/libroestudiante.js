// routes/libroEstudiante.js
const express = require("express");
const router = express.Router();

// Bloque 1:
const libroEstudianteController = require("../controllers/libroestudiante");

// Bloque 2:
router.post("/save", libroEstudianteController.prestar);
router.get("/list", libroEstudianteController.listar);
router.get("/find/:id", libroEstudianteController.obtener);

// Se ajusta la ruta 'devolver' para que no colisione con el formato genérico de actualización
router.put("/devolver/:id", libroEstudianteController.devolver); 

router.delete("/delete/:id", libroEstudianteController.eliminar);

// Bloque 3:
module.exports = router;