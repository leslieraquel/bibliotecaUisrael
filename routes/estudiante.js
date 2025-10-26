// routes/estudiante.js
const express = require("express");
const router = express.Router();

// Bloque 1:
const estudianteController = require("../controllers/estudiante");

// Bloque 2:
router.post("/save", estudianteController.crear);
router.get("/list", estudianteController.listar);
router.get("/find/:id", estudianteController.obtener);
router.put("/update/:id", estudianteController.actualizar);
router.delete("/delete/:id", estudianteController.eliminar);

// Bloque 3:
module.exports = router;