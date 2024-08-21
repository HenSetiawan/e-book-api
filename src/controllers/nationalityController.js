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

export { getAllNationality };
