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

const deleteRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: parseInt(roleId),
      },
    });
    if (!role) {
      res
        .status(404)
        .json({ data: role, message: `role with id ${roleId} is not found` });
      return;
    }

    const deletedRole = await prisma.role.delete({
      where: {
        id: parseInt(roleId),
      },
    });
    res.status(200).json({ data: deletedRole, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getAllRoles, createNewRole, deleteRoleById };
