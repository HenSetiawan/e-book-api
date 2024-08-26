import express from "express";
import cookieParser from "cookie-parser";
import apiRoute from "./src/routers/index.js";
import { swaggerUi, specs } from "./swagger.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", apiRoute);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
