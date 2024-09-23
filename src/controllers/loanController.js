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
      },
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
  // check is the book is available
  const userId = req.data.userData.id;
  const book = await prisma.book.findFirst({
    where: {
      id: parseInt(req.body.bookId),
      stock: {
        gt: 0,
      },
    },
  });

  if (!book) {
    return res.status(404).json({
      data: book,
      message: `book with id ${req.body.bookId} is not found`,
    });
  }

  // check if the user already have book loan more than 1
  const activeLoans = await prisma.loan.findMany({
    where: {
      userId: parseInt(userId),
      status: "active",
    },
  });

  if (activeLoans.length > 1) {
    return res.status(400).json({
      data: activeLoans,
      message: `user already have 2 book loaned`,
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

  // check if user have penalty
  const userPenalties = await prisma.penalty.findFirst({
    where: {
      userId: parseInt(userId),
      endDate: {
        gt: startDateUtc,
      },
    },
  });

  if (userPenalties) {
    return res.status(400).json({
      data: userPenalties,
      message: `user have active pinalty`,
    });
  }

  try {
    // create new loan and update book stock
    const [loan, updatedBook] = await prisma.$transaction([
      prisma.loan.create({
        data: {
          bookId: parseInt(req.body.bookId),
          userId: parseInt(userId),
          status: "active",
          startDate: startDateUtc,
          endDate: endDateUtc,
        },
      }),
      prisma.book.update({
        where: {
          id: parseInt(req.body.bookId),
        },
        data: {
          stock: {
            decrement: 1,
          },
        },
      }),
    ]);

    return res.status(201).json({ data: loan, message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const returnLoanedBook = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.data.userData.id;

  try {
    // Mulai transaksi
    await prisma.$transaction(async (prisma) => {
      // Ambil data pinjaman berdasarkan bookId dan userId
      const loanedData = await prisma.loan.findFirst({
        where: {
          bookId: parseInt(bookId),
          userId: parseInt(userId),
        },
      });

      if (!loanedData) {
        throw new Error("Loan is not found");
      }

      // Periksa apakah tanggal akhir lebih dari hari ini, jika iya berikan penalti
      const endDate = new Date(loanedData.endDate);
      const today = new Date();

      if (endDate > today) {
        const penaltyEndDate = new Date(today);
        penaltyEndDate.setDate(today.getDate() + 7);

        // Tambahkan penalti
        await prisma.penalty.create({
          data: {
            userId: loanedData.userId,
            loanId: loanedData.id,
            startDate: today,
            endDate: penaltyEndDate,
          },
        });
      }

      // Update status loan menjadi "inactive"
      await prisma.loan.update({
        where: {
          id: loanedData.id, // Gunakan "id" bukan "loanId"
        },
        data: {
          status: "inactive",
        },
      });

      // Update stok buku
      await prisma.book.update({
        where: {
          id: parseInt(req.body.bookId),
        },
        data: {
          stock: {
            increment: 1,
          },
        },
      });
    });

    // Jika transaksi berhasil, kirim respons sukses
    res.status(200).json({
      message: 'Loan returned successfully, stock updated.',
    });
  } catch (error) {
    // Jika ada error, kirimkan respons error
    res.status(500).json({
      message: error.message || 'Something went wrong with the transaction.',
    });
  }
};


export {
  getLoanById,
  getAllLoan,
  getLoanByUserloggedIn,
  deleteLoanById,
  createNewLoan,
  returnLoanedBook
};
