// routes/autor.js
const express = require("express");
const router = express.Router();

// Bloque 1:
const autorController = require("../controllers/autor");

// Bloque 2:
// La convención RESTful original (router.post('/', ctrl.crear)) se mapea al formato solicitado
router.post("/save", autorController.crear);
router.get("/list", autorController.listar);
router.get("/find/:id", autorController.obtener);
router.put("/update/:id", autorController.actualizar);
router.delete("/delete/:id", autorController.eliminar);

// Bloque 3:
module.exports = router;