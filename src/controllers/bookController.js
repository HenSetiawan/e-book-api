import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
      include: {
        author: true,
        language: true,
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    if (!book) {
      return res.status(404).json({
        data: book,
        message: `book with id ${bookId} is not found`,
      });
    } else {
      return res.status(200).json({ data: book, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllBook = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        language: true,
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });
    return res.status(200).json({ data: books, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createNewBook = async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: {
        title: req.body.title,
        isbn: req.body.isbn,
        authorId: parseInt(req.body.authorId),
        languageId: parseInt(req.body.languageId),
        synopsys: req.body.synopsys,
        stock: 1,
      },
    });

    const bookGenres = req.body.genres;
    for (const genreId of bookGenres) {
      await prisma.bookGenre.create({
        data: {
          book: {
            connect: { id: book.id },
          },
          genre: {
            connect: { id: parseInt(genreId) },
          },
        },
      });
    }

    return res.status(201).json({ data: book, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
    });

    if (!book) {
      return res.status(404).json({
        data: book,
        message: `book with id ${bookId} is not found`,
      });
    }

    const deletedBook = await prisma.book.delete({
      where: {
        id: parseInt(bookId),
      },
    });
    return res.status(200).json({ data: deletedBook, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
    });
    if (!book) {
      return res.status(404).json({
        data: book,
        message: `book with id ${bookId} is not found`,
      });
    }
    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(bookId),
      },
      data: req.body,
    });
    return res.status(200).json({ data: updatedBook, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export {
  getBookById,
  getAllBook,
  createNewBook,
  deleteBookById,
  updateBookById,
};
