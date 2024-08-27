import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getGenreById = async (req, res) => {
  const genreId = req.params.id;
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id: parseInt(genreId),
      },
    });

    if (!genre) {
      return res.status(404).json({
        data: genre,
        message: `genre with id ${genreId} is not found`,
      });
    } else {
      return res.status(200).json({ data: genre, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllGenre = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany();
    return res.status(200).json({ data: genres, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createNewGenre = async (req, res) => {
  try {
    const genre = await prisma.genre.create({
      data: {
        name: req.body.name,
        description: req.body.description,
      },
    });
    return res.status(201).json({ data: genre, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteGenreById = async (req, res) => {
  const genreId = req.params.id;
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id: parseInt(genreId),
      },
    });

    if (!genre) {
      return res.status(404).json({
        data: genre,
        message: `genre with id ${genreId} is not found`,
      });
    }

    const deletedGenre = await prisma.genre.delete({
      where: {
        id: parseInt(genreId),
      },
    });
    return res.status(200).json({ data: deletedGenre, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateGenreById = async (req, res) => {
  const genreId = req.params.id;
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id: parseInt(genreId),
      },
    });
    if (!genre) {
      return res.status(404).json({
        data: genre,
        message: `genre with id ${genreId} is not found`,
      });
    }
    const updatedGenre = await prisma.genre.update({
      where: {
        id: parseInt(genreId),
      },
      data: req.body,
    });
    return res.status(200).json({ data: updatedGenre, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getGenreById, getAllGenre, createNewGenre, deleteGenreById, updateGenreById };
