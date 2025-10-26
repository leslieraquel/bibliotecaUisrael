const express = require("express");
const router = express.Router();

//Bloque 1:
const libroController = require("../controllers/libro");

//Bloque 2:

router.post("/save", libroController.crear);
router.get("/list", libroController.listar);
router.get("/find/:id", libroController.obtener);
router.put("/update/:id", libroController.actualizar);
router.delete("/delete/:id", libroController.eliminar);


//Bloque 3:
module.exports = router;