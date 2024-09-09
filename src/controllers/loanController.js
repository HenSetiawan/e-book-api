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

const getAllLoan = async (req, res) => {
  try {
    const loans = await prisma.book.findMany({
      include: {
        book: true,
        user: true,
      },
    });
    return res.status(200).json({ data: loans, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getLoanByUserloggedIn = async (req, res) => {
  const userId = req.data.userData.id;
  try {
    const loan = await prisma.loan.findMany({
      where: {
        userId: userId,
      },
    });
    return res.status(200).json({ data: loan, message: `success` });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getLoanById, getAllLoan, getLoanByUserloggedIn };
