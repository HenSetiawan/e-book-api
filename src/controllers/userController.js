import { PrismaClient } from "@prisma/client";
import { hashString } from "../utils/hash.js";
const prisma = new PrismaClient();

const getAllusers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ data: users, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
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
    } else {
      res.status(200).json({ data: user, message: `success` });
    }
  } catch (error) {}
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
    res.status(200).json({ data: deleteUser, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        fullname: req.body.fullname,
        address: req.body.address,
        email: req.body.email,
        nik: req.body.nik,
        password: await hashString(req.body.password),
        role: req.body.role,
      },
    });

    res.status(201).json({ data: user, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
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
      res
        .status(404)
        .json({ data: user, message: `user with id ${userId} is not found` });
      return;
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: req.body,
    });
    res.status(200).json({ data: updatedUser, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export {
  getAllusers,
  deleteUserById,
  registerUser,
  getUserById,
  updateUserById,
};
