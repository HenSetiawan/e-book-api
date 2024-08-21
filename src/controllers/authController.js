import { PrismaClient } from "@prisma/client";
import { verifyHashed } from "../utils/hash.js";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const login = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        role: true,
      },
    });

    if (userWithEmail !== null) {
      const isPasswordMatch = await verifyHashed(
        userPassword,
        userWithEmail.password
      );
      if (isPasswordMatch) {
        const accessToken = jwt.sign(
          { userData: userWithEmail },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        const refreshToken = jwt.sign(
          { userData: userWithEmail },
          process.env.JWT_REFRESH,
          {
            expiresIn: "7d",
          }
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
        });
        res
          .status(200)
          .json({ status: "success", data: userWithEmail, token: accessToken });
      } else {
        res.status(400).json({ message: `username or password is wrong` });
        return;
      }
    } else {
      res.status(400).json({ message: `username or password is wrong` });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: `something went wrong`, error: error });
    return;
  }
};

export { login };
