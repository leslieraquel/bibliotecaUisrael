// controllers/autor.js
const { Autor, Libro } = require('../models');

const crear = async (req, res) => {
  try {
    const { nombre, bio } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
    const autor = await Autor.create({ nombre, bio });
    res.status(201).json(autor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear autor' });
  }
};

const listar = async (req, res) => {
  try {
    const autores = await Autor.findAll({
      include: [{ model: Libro, as: 'libros', attributes: ['id','titulo'] }]
    });
    res.json(autores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar autores' });
  }
};

const obtener = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id, {
      include: [{ model: Libro, as: 'libros' }]
    });
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(autor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
};

const actualizar = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    const { nombre, bio } = req.body;
    await autor.update({ nombre, bio });
    res.json(autor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const eliminar = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    // opcional: verificar si tiene libros y evitar borrado
    const libros = await autor.getLibros();
    if (libros && libros.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar: autor tiene libros' });
    }
    await autor.destroy();
    res.json({ message: 'Autor eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = { crear, listar, obtener, actualizar, eliminar };
