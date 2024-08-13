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
  console.log(userId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      res
        .status(404)
        .json({ data: user, message: `user with id ${userId} is not found` });
      return;
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
    res.json({ data: deleteUser, message: "success" }).status(200);
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
