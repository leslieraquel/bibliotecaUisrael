const Book = require('../models/libro');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); // Trae todos los registros
    res.status(200).json(books); // Devuelve los datos en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al traer los libros', error });
  }
};



module.exports = { getAllBooks };