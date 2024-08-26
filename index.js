import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./src/routers/user.js";
import roleRoute from "./src/routers/role.js";
import authRoute from "./src/routers/auth.js";
import nationalityRoute from "./src/routers/nationality.js";
import authorRoute from "./src/routers/author.js";
import languageRoute from "./src/routers/language.js";
import bookRoute from "./src/routers/book.js";
import { swaggerUi, specs } from "./swagger.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userRoute);
app.use("/api/v1", roleRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", nationalityRoute);
app.use("/api/v1", authorRoute);
app.use("/api/v1", languageRoute);
app.use("/api/v1", bookRoute);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
