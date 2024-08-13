import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./src/routers/user.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/',userRoute);

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
