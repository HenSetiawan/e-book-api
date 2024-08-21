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
        return res
          .status(200)
          .json({ status: "success", data: userWithEmail, token: accessToken });
      } else {
        return res
          .status(400)
          .json({ message: `username or password is wrong` });
      }
    } else {
      return res.status(400).json({ message: `username or password is wrong` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `something went wrong`, error: error });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.JWT_REFRESH, async (err, decode) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "refresh token is not valid", status: "failed" });
      } else {
        const userData = await prisma.user.findUnique({
          where: {
            id: decode.userData.id,
          },
          include: {
            role: true,
          },
        });

        if (userData != null) {
          const accessToken = jwt.sign(userData, process.env.JWT_KEY, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            status: "success",
            data: userData,
            token: accessToken,
          });
        } else {
          return res
            .status(403)
            .json({ message: "refresh token is not valid", status: "failed" });
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "refresh token missing", status: "failed" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({ message: "Logged out and cookie cleared" });
};

export { login, refreshToken, logout };
