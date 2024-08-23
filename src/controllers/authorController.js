import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAuthorById = async (req, res) => {
  const authorId = req.params.id;
  try {
    const author = await prisma.author.findUnique({
      where: {
        id: parseInt(authorId),
      },
    });

    if (!author) {
      return res.status(404).json({
        data: author,
        message: `author with id ${authorId} is not found`,
      });
    } else {
      return res.status(200).json({ data: author, message: `success` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      include: {
        nationality: true,
      },
    });
    res.status(200).json({ data: authors, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getAuthorById, getAllAuthor };
