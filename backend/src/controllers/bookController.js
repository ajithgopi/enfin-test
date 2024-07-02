const Book = require('../models/Book');

const getBooks = async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query
  const pageNum = page > 0 ? parseInt(page) : 1
  const limitNum = parseInt(limit)
  const searchQuery = q ?? ''

  try {
    const totalBooks = await Book.countDocuments(searchQuery ? { $text: { $search: searchQuery } } : {});
    const books = await Book.find(searchQuery ? { $text: { $search: searchQuery } } : {}).skip((pageNum - 1) * limitNum).limit(limitNum);
    const totalPages = Math.ceil(totalBooks / limitNum);

    res.json({
      data: books,
      pagination: {
        total: totalBooks,
        totalPages,
        currentPage: pageNum,
        pageSize: limitNum
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const createBook = async (req, res) => {
  const { name, description, date_published, price } = req.body
  try {
    const newUser = new Book({
      name,
      description,
      date_published,
      price
    })
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  getBooks,
  createBook
}