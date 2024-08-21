import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export { getAllNationality, createNewNationallity };
