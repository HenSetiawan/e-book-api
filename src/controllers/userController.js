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

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.json(deletedUser).status(200);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

export { getAllusers, deleteUserById };
