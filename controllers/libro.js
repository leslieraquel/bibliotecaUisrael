// controllers/libro.js
const { Libro, Autor } = require('../models');

const crear = async (req, res) => {
  try {
    const { titulo, isbn, editorial, anio, autorId } = req.body;
    if (!titulo || !autorId) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    // opcional: validar que autor exista
    const autor = await Autor.findByPk(autorId);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });

    const libro = await Libro.create({ titulo, isbn, editorial, anio, autorId });
    res.status(201).json(libro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear libro' });
  }
};

const listar = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      include: [{ model: Autor, as: 'autor', attributes: ['idautores','nombre'] }]
    });
    res.json(libros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar libros' });
  }
};

const obtener = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findByPk(id, {
      include: [{ model: Autor, as: 'autor', attributes: ['id','nombre'] }]
    });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
};

const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, isbn, editorial, anio, autorId } = req.body;
    const libro = await Libro.findByPk(id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    if (autorId) {
      const autor = await Autor.findByPk(autorId);
      if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    }

    await libro.update({ titulo, isbn, editorial, anio, autorId });
    res.json(libro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findByPk(id);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    await libro.destroy();
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = { 
  crear, 
  listar, 
  obtener, 
  actualizar, 
  eliminar
};
