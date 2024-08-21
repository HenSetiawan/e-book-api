import { PrismaClient } from "@prisma/client";
import { hashString } from "../utils/hash.js";
const prisma = new PrismaClient();

const getAllusers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
  return res.status(200).json({ data: users, message: "success" });
  } catch (error) {
   return res.status(500).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        role: true,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ data: user, message: `user with id ${userId} is not found` });
    } else {
      return res.status(200).json({ data: user, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
    return res
        .status(404)
        .json({ data: user, message: `user with id ${userId} is not found` });
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
  return  res.status(200).json({ data: deleteUser, message: "success" });
  } catch (error) {
  return  res.status(500).json({ message: error });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        fullname: req.body.fullname,
        address: req.body.address,
        email: req.body.email,
        nik: parseInt(req.body.nik),
        password: await hashString(req.body.password),
        roleId: parseInt(req.body.roleId),
      },
    });

   return res.status(201).json({ data: user, message: "success" });
  } catch (error) {
   return res.status(500).json({ message: error });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
     return res
        .status(404)
        .json({ data: user, message: `user with id ${userId} is not found` });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: req.body,
    });
   return res.status(200).json({ data: updatedUser, message: "success" });
  } catch (error) {
   return res.status(500).json({ message: error });
  }
};

export {
  getAllusers,
  deleteUserById,
  registerUser,
  getUserById,
  updateUserById,
};
