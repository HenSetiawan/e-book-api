import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllusers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users).status(200);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

export { getAllusers };
