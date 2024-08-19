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

export { getAllRoles };
