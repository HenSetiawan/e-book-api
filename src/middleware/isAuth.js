import jwt from "jsonwebtoken";
const isAuth = (roles = []) => {
  return (req, res, next) => {
    const accessToken = req.header("Authorization")?.split(" ")[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ message: "access token missing", status: "failed" });
    }

    jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "token is not valid",
          status: "failed",
          error: err,
        });
      } else {
        const userRole = user.userData.role.name.toLowerCase();
        if (!roles.includes(userRole)) {
          return res.status(403).json({ message: "Forbidden" });
        } else {
          req.data = user;
          next();
        }
      }
    });
  };
};

export default isAuth;
