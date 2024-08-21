import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getNationalityById = async (req, res) => {
    const nationalityId = req.params.id;
    try {
      const nationality = await prisma.nationality.findUnique({
        where: {
          id: parseInt(nationalityId),
        },
      });
      if (!nationality) {
       return res
          .status(404)
          .json({ data: nationality, message: `nationality with id ${nationalityId} is not found` });
      } else {
       return res.status(200).json({ data: nationality, message: `success` });
      }
    } catch (error) {
        res.status(500).json({ message: error });
    }
  };

const getAllNationality = async (req, res) => {
  try {
    const nationalities = await prisma.nationality.findMany();
    res.status(200).json({ data: nationalities, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createNewNationallity = async (req, res) => {
  try {
    const nationality = await prisma.nationality.create({
      data: {
        name: req.body.name,
      },
    });
    res.status(201).json({ data: nationality, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteNationalityById = async (req, res) => {
  const nationalityId = req.params.id;
  try {
    const nationality = await prisma.nationality.findUnique({
      where: {
        id: parseInt(nationalityId),
      },
    });
    if (!nationality) {
      res
        .status(404)
        .json({ data: nationality, message: `nationality with id ${nationalityId} is not found` });
      return;
    }

    const deletedNationality = await prisma.nationality.delete({
      where: {
        id: parseInt(nationalityId),
      },
    });
    res.status(200).json({ data: deletedNationality, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getAllNationality, createNewNationallity, deleteNationalityById };
