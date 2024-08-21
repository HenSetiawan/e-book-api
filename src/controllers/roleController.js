import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: parseInt(roleId),
      },
    });
    if (!role) {
      return res
        .status(404)
        .json({ data: role, message: `role with id ${roleId} is not found` });
    } else {
      return res.status(200).json({ data: role, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    return res.status(200).json({ data: roles, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createNewRole = async (req, res) => {
  try {
    const role = await prisma.role.create({
      data: {
        name: req.body.name,
      },
    });
    return res.status(201).json({ data: role, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
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
      return res
        .status(404)
        .json({ data: role, message: `role with id ${roleId} is not found` });
    }

    const deletedRole = await prisma.role.delete({
      where: {
        id: parseInt(roleId),
      },
    });
    return res.status(200).json({ data: deletedRole, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: parseInt(roleId),
      },
    });
    if (!role) {
      return res
        .status(404)
        .json({ data: role, message: `role with id ${roleId} is not found` });
    }
    const updatedRole = await prisma.role.update({
      where: {
        id: parseInt(roleId),
      },
      data: req.body,
    });
    return res.status(200).json({ data: updatedRole, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export {
  getAllRoles,
  createNewRole,
  deleteRoleById,
  updateRoleById,
  getRoleById,
};
