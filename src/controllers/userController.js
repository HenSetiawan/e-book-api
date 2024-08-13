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

const registerUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        fullname: req.body.name,
        adress: req.body.adress,
        email: req.body.email,
        nik: req.body.nik,
        password: req.body.password,
        role: req.body.role,
      },
    });

    res.json(user).status(200);
  } catch (error) {
    res.json({ message: error }).status(500);
  }
};

export { getAllusers, deleteUserById, registerUser };
