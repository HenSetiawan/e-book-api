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
    const loans = await prisma.loan.findMany({
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

const deleteLoanById = async (req, res) => {
  const loanId = req.params.id;
  try {
    const loan = await prisma.loan.findUnique({
      where: {
        id: parseInt(loanId),
      }
    });

    if (!loan) {
      return res.status(404).json({
        data: loan,
        message: `loan with id ${loanId} is not found`,
      });
    } else {
      const deletedLoan = await prisma.loan.delete({
        where: {
          id: parseInt(loanId),
        },
      });
      return res.status(200).json({ data: deletedLoan, message: `success` });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createNewLoan = async (req, res) => {
  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(req.body.bookId),
    }
  });

  if (!book) {
    return res.status(404).json({
      data: book,
      message: `book with id ${req.body.bookId} is not found`,
    });
  }

  const now = new Date();
  const startDateUtc = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    )
  );

  const futureDateTime = new Date(now);
  futureDateTime.setDate(futureDateTime.getDate() + 7);
  const endDateUtc = new Date(
    Date.UTC(
      futureDateTime.getUTCFullYear(),
      futureDateTime.getUTCMonth(),
      futureDateTime.getUTCDate(),
      futureDateTime.getUTCHours(),
      futureDateTime.getUTCMinutes(),
      futureDateTime.getUTCSeconds()
    )
  );
  try {
    const loan = await prisma.loan.create({
      data: {
        bookId: parseInt(req.body.bookId),
        userId: parseInt(req.body.userId),
        status: "active",
        startDate: startDateUtc,
        endDate: endDateUtc,
      },
    });

    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(req.body.bookId),
      },
      data: {
        stock: parseInt(book.stock - 1),
      },
    });

    return res.status(201).json({ data: loan, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export {
  getLoanById,
  getAllLoan,
  getLoanByUserloggedIn,
  deleteLoanById,
  createNewLoan,
};
