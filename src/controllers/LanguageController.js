import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getLanguageById = async (req, res) => {
  const getLanguageId = req.params.id;
  try {
    const language = await prisma.language.findUnique({
      where: {
        id: parseInt(getLanguageId),
      },
    });

    if (!language) {
      return res.status(404).json({
        data: language,
        message: `language with id ${getLanguageId} is not found`,
      });
    } else {
      return res.status(200).json({ data: language, message: `success` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { getLanguageById };
