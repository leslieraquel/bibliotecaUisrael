const express = require("express");
const router = express.Router();

//Bloque 1:
const libroController = require("../controllers/libro");

//Bloque 2:
router.post("/save",libroController.save);
router.get("/proyects",libroController.list);
router.get("/find/:id",libroController.findById);
router.get("/update/:id",libroController.update);
router.delete("/delete",libroController.deleteLibro);



//Bloque 3:
module.exports = router;