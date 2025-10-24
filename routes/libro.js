const express = require("express");
const router = express.Router();

//Bloque 1:
const libroController = require("../controllers/libro");

//Bloque 2:
// router.post("/save",libroController.save);
router.get("/list",libroController.getAllLibros);
// router.get("/find/:id",libroController.findById);
// // router.get("/update/:id",libroController.update);
// router.delete("/delete",libroController.deleteLibro);

router.post("/save", libroController.createLibro);
router.get("/list", libroController.getAllLibros);
router.get("/find/:id", libroController.getLibroById);
router.put("/update/:id", libroController.updateLibro);
router.delete("/delete/:id", libroController.deleteLibro);




//Bloque 3:
module.exports = router;