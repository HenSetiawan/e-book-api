import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getBookById = async (req, res) => {
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
    } else {
      return res.status(200).json({ data: book, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllBook = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
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
    return res.status(201).json({ data: book, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getBookById, getAllBook, createNewBook };
