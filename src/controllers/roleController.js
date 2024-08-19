import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json({ data: roles, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createNewRole = async (req, res) => {
  try {
    const role = await prisma.role.create({
      data: {
        name: req.body.name,
      },
    });
    res.status(201).json({ data: role, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getAllRoles, createNewRole };
