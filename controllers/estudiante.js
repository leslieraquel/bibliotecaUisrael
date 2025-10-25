// controllers/estudiante.js
const { Estudiante, LibroEstudiante } = require('../models');

const crear = async (req, res) => {
  try {
    const { nombre, correo, carrera } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
    const estudiante = await Estudiante.create({ nombre, correo, carrera });
    res.status(201).json(estudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
};

const listar = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: [{ model: LibroEstudiante, as: 'registros' }]
    });
    res.json(estudiantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar estudiantes' });
  }
};

const obtener = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id, {
      include: [{ model: LibroEstudiante, as: 'registros' }]
    });
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
};

const actualizar = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    const { nombre, correo, carrera } = req.body;
    await estudiante.update({ nombre, correo, carrera });
    res.json(estudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const eliminar = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    // opcional: verificar si tiene registros de préstamos
    const registros = await estudiante.getRegistros();
    if (registros && registros.length > 0) {
      return res.status(400).json({ error: 'No se puede eliminar: estudiante tiene registros' });
    }
    await estudiante.destroy();
    res.json({ message: 'Estudiante eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = { crear, listar, obtener, actualizar, eliminar };
