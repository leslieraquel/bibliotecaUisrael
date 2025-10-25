// controllers/libroEstudiante.js
const { LibroEstudiante, Libro, Estudiante } = require('../models');

const prestar = async (req, res) => {
  try {
    const { libroId, estudianteId, fechaPrestamo } = req.body;
    if (!libroId || !estudianteId) return res.status(400).json({ error: 'libroId y estudianteId requeridos' });

    const libro = await Libro.findByPk(libroId);
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

    const estudiante = await Estudiante.findByPk(estudianteId);
    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });

    // crear registro de préstamo
    const registro = await LibroEstudiante.create({
      libroId,
      estudianteId,
      fechaPrestamo: fechaPrestamo || new Date(),
      estado: 'prestado'
    });

    res.status(201).json(registro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear registro' });
  }
};

const listar = async (req, res) => {
  try {
    const registros = await LibroEstudiante.findAll({
      include: [
        { model: Libro, as: 'libro', attributes: ['id','titulo'] },
        { model: Estudiante, as: 'estudiante', attributes: ['id','nombre'] }
      ],
      order: [['fechaPrestamo','DESC']]
    });
    res.json(registros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar registros' });
  }
};

const obtener = async (req, res) => {
  try {
    const registro = await LibroEstudiante.findByPk(req.params.id, {
      include: [
        { model: Libro, as: 'libro' },
        { model: Estudiante, as: 'estudiante' }
      ]
    });
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
};

const devolver = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaDevolucion } = req.body;
    const registro = await LibroEstudiante.findByPk(id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });

    await registro.update({
      fechaDevolucion: fechaDevolucion || new Date(),
      estado: 'devuelto'
    });

    res.json(registro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
};

const eliminar = async (req, res) => {
  try {
    const registro = await LibroEstudiante.findByPk(req.params.id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    await registro.destroy();
    res.json({ message: 'Registro eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

module.exports = { prestar, listar, obtener, devolver, eliminar };
