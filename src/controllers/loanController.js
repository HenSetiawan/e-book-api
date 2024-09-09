import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getLoanById = async (req, res) => {
  const loanId = req.params.id;
  try {
    const loan = await prisma.loan.findUnique({
      where: {
        id: parseInt(loanId),
      },
      include: {
        book: true,
        user: true,
      },
    });

    if (!loan) {
      return res.status(404).json({
        data: loan,
        message: `loan with id ${loanId} is not found`,
      });
    } else {
      return res.status(200).json({ data: loan, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getLoanById };
